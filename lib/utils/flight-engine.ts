import { calendarPrices } from "../data/calendarPrices.ts";
import { flightTemplates } from "../data/flights.ts";
import { routes } from "../data/routes.ts";
import type {
  CalendarPriceItem,
  FlightResult,
  FlightTemplate,
  ResultsExperience,
  RouteRecord,
  SearchQuery
} from "../types.ts";
import { generateAiReview } from "./ai-reviews.ts";
import { combineDateAndTime, timeToMinutes } from "./date.ts";

const PRICE_SCORE_MAP: Record<number, number> = {
  1: 38,
  2: 34,
  3: 30,
  4: 26
};

function getCheckedBaggageKg(value: string): number {
  return Number(value.replace("kg", ""));
}

function getTimeFilterMatch(flight: FlightResult, time: SearchQuery["time"]): boolean {
  if (time === "any") {
    return true;
  }

  const minutes = timeToMinutes(flight.departTimeLocal);

  if (time === "early") {
    return minutes >= 300 && minutes < 480;
  }
  if (time === "day") {
    return minutes >= 480 && minutes < 1080;
  }
  if (time === "evening") {
    return minutes >= 1080 && minutes < 1380;
  }

  return minutes >= 1380 || minutes < 300;
}

function getStopsFilterMatch(flight: FlightResult, stops: SearchQuery["stops"]): boolean {
  if (stops === "any") {
    return true;
  }
  if (stops === "direct") {
    return flight.stopCount === 0;
  }
  return flight.stopCount === 1;
}

function getBaggageFilterMatch(flight: FlightResult, baggage: SearchQuery["baggage"]): boolean {
  if (baggage === "any") {
    return true;
  }
  if (baggage === "checked") {
    return flight.checkedBaggage !== "0kg";
  }
  return flight.checkedBaggage === "0kg";
}

function getFlexibilityMatch(
  flight: FlightResult,
  flexibility: SearchQuery["flexibility"]
): boolean {
  if (flexibility === "any") {
    return true;
  }
  if (flexibility === "flexible") {
    return (
      flight.changePolicyLevel === "flexible" || flight.changePolicyLevel === "limited"
    );
  }
  return flight.changePolicyLevel === "strict";
}

function isHighRiskFlight(flight: FlightResult): boolean {
  return (
    flight.isSelfTransfer ||
    flight.isCrossTerminal ||
    (flight.stopCount > 0 && flight.transferMinutes < 90) ||
    (flight.isRedEye && flight.checkedBaggage === "0kg")
  );
}

function getCheapestTieBreaker(left: FlightResult, right: FlightResult): number {
  return (
    left.totalPrice - right.totalPrice ||
    left.stopCount - right.stopCount ||
    getCheckedBaggageKg(right.checkedBaggage) - getCheckedBaggageKg(left.checkedBaggage) ||
    Number(left.isRedEye) - Number(right.isRedEye) ||
    left.flightId.localeCompare(right.flightId)
  );
}

function getBestValueScore(flight: FlightResult): number {
  const priceScore = PRICE_SCORE_MAP[flight.priceRank] ?? 26;
  let directScore = 0;

  if (flight.stopCount === 0) {
    directScore = 20;
  } else if (flight.isSelfTransfer) {
    directScore = 0;
  } else if (flight.transferMinutes >= 120) {
    directScore = 10;
  } else if (flight.transferMinutes >= 90) {
    directScore = 6;
  } else {
    directScore = 2;
  }

  let baggageScore = 0;
  const baggageKg = getCheckedBaggageKg(flight.checkedBaggage);
  if (baggageKg >= 20) {
    baggageScore = 15;
  } else if (baggageKg === 15) {
    baggageScore = 10;
  }

  const flexibilityScore =
    flight.changePolicyLevel === "flexible"
      ? 12
      : flight.changePolicyLevel === "limited"
        ? 6
        : 0;

  const timeScore = flight.isRedEye ? 0 : 8;

  let riskDeduction = 0;
  if (flight.isSelfTransfer) {
    riskDeduction += 14;
  }
  if (flight.isCrossTerminal) {
    riskDeduction += 8;
  }
  if (flight.stopCount > 0 && flight.transferMinutes < 90) {
    riskDeduction += 12;
  }
  if (flight.checkedBaggage === "0kg") {
    riskDeduction += 8;
  }

  return priceScore + directScore + baggageScore + flexibilityScore + timeScore - riskDeduction;
}

function getLabels(
  flight: FlightResult,
  flights: FlightResult[],
  sort: SearchQuery["sort"]
): string[] {
  const labels: string[] = [];
  const cheapest = [...flights].sort(getCheapestTieBreaker)[0];
  const bestValue = [...flights].sort((left, right) => {
    return (
      right.bestValueScore - left.bestValueScore ||
      left.totalPrice - right.totalPrice ||
      left.stopCount - right.stopCount ||
      Number(left.isRedEye) - Number(right.isRedEye) ||
      left.flightId.localeCompare(right.flightId)
    );
  })[0];

  if (cheapest && cheapest.flightId === flight.flightId) {
    labels.push("最低价");
  }
  if (bestValue && bestValue.flightId === flight.flightId) {
    labels.push("性价比优选");
  }
  if (flight.changePolicyLevel !== "strict" && flight.checkedBaggage !== "0kg") {
    labels.push("规则友好");
  }
  if (flight.checkedBaggage === "0kg") {
    labels.push("托运缺失");
  }
  if (flight.isRedEye) {
    labels.push("红眼慎选");
  }
  if (
    flight.isSelfTransfer ||
    flight.isCrossTerminal ||
    (flight.stopCount > 0 && flight.transferMinutes < 90)
  ) {
    labels.push("中转风险");
  }

  return labels.filter((label, index) => labels.indexOf(label) === index).slice(0, sort === "best_value" ? 3 : 2);
}

function getRouteByCities(from: string, to: string): RouteRecord | null {
  return routes.find((route) => route.originCity === from && route.destinationCity === to) ?? null;
}

function buildFlightResult(
  template: FlightTemplate,
  route: RouteRecord,
  date: string,
  priceDelta: number
): FlightResult {
  const baseFare = template.baseFare + priceDelta;
  const totalPrice = baseFare + template.taxFee;

  return {
    ...template,
    route,
    departDateTime: combineDateAndTime(date, template.departTimeLocal),
    arriveDateTime: combineDateAndTime(date, template.arriveTimeLocal, template.arrivalDayOffset),
    baseFare,
    totalPrice,
    bestValueScore: 0,
    priceRank: 0,
    priceGapFromCheapest: 0,
    aiReview: { short: "", detail: "" },
    labels: []
  };
}

function getSelectedCalendar(routeId: string): CalendarPriceItem[] {
  const record = calendarPrices.find((item) => item.routeId === routeId);
  if (!record) {
    return [];
  }

  return record.prices;
}

export function getResultsExperience(query: SearchQuery): ResultsExperience {
  const route = getRouteByCities(query.from, query.to);

  if (!route) {
    return {
      query,
      route: null,
      flights: [],
      flightsBeforeFilters: [],
      calendarItems: [],
      selectedCalendarDate: query.departDate,
      hasExactRoute: false
    };
  }

  const calendarItems = getSelectedCalendar(route.routeId);
  const selectedCalendarItem =
    calendarItems.find((item) => item.date === query.departDate) ?? calendarItems[3];
  const routeFlightTemplates = flightTemplates.filter((item) => item.routeId === route.routeId);
  const baseLowest = Math.min(...routeFlightTemplates.map((item) => item.baseFare + item.taxFee));
  const priceDelta = selectedCalendarItem.lowestTotalPrice - baseLowest;
  const allFlights = routeFlightTemplates.map((template) =>
    buildFlightResult(template, route, selectedCalendarItem.date, priceDelta)
  );

  const filteredFlights = allFlights.filter((flight) => {
    if (!getTimeFilterMatch(flight, query.time)) {
      return false;
    }
    if (!getStopsFilterMatch(flight, query.stops)) {
      return false;
    }
    if (!getBaggageFilterMatch(flight, query.baggage)) {
      return false;
    }
    if (!getFlexibilityMatch(flight, query.flexibility)) {
      return false;
    }
    if (query.hideRisk && isHighRiskFlight(flight)) {
      return false;
    }

    return true;
  });

  const cheapestSorted = [...filteredFlights].sort(getCheapestTieBreaker);
  cheapestSorted.forEach((flight, index) => {
    flight.priceRank = index + 1;
  });

  const cheapestPrice = cheapestSorted[0]?.totalPrice ?? 0;
  filteredFlights.forEach((flight) => {
    flight.bestValueScore = getBestValueScore(flight);
    flight.priceGapFromCheapest = flight.totalPrice - cheapestPrice;
  });

  filteredFlights.forEach((flight) => {
    flight.aiReview = generateAiReview(flight);
    flight.labels = getLabels(flight, filteredFlights, query.sort);
  });

  const flights =
    query.sort === "cheapest"
      ? [...filteredFlights].sort(getCheapestTieBreaker)
      : [...filteredFlights].sort((left, right) => {
          return (
            right.bestValueScore - left.bestValueScore ||
            left.totalPrice - right.totalPrice ||
            left.stopCount - right.stopCount ||
            Number(left.isRedEye) - Number(right.isRedEye) ||
            left.flightId.localeCompare(right.flightId)
          );
        });

  return {
    query: {
      ...query,
      departDate: selectedCalendarItem.date
    },
    route,
    flights,
    flightsBeforeFilters: allFlights,
    calendarItems,
    selectedCalendarDate: selectedCalendarItem.date,
    hasExactRoute: true
  };
}

export function getDistinctOriginCities(): string[] {
  return [...new Set(routes.map((route) => route.originCity))];
}

export function getDistinctDestinationCities(): string[] {
  return [...new Set(routes.map((route) => route.destinationCity))];
}
