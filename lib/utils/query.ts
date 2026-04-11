import { DEFAULT_QUERY } from "../constants.ts";
import type {
  BaggageFilter,
  FlexibilityFilter,
  SearchQuery,
  SortMode,
  StopsFilter,
  TimeFilter,
  TripType
} from "../types.ts";

type SearchParamsReader = { get: (key: string) => string | null };

type SearchParamsInput =
  | URLSearchParams
  | SearchParamsReader
  | Record<string, string | string[] | undefined>;

function readValue(searchParams: SearchParamsInput, key: string): string | undefined {
  if (
    searchParams instanceof URLSearchParams ||
    typeof (searchParams as SearchParamsReader).get === "function"
  ) {
    return (searchParams as SearchParamsReader).get(key) ?? undefined;
  }

  const value = (searchParams as Record<string, string | string[] | undefined>)[key];
  return Array.isArray(value) ? value[0] : value;
}

function readTripType(value?: string): TripType {
  return value === "round_trip" ? "round_trip" : "one_way";
}

function readSort(value?: string): SortMode {
  return value === "cheapest" ? "cheapest" : "best_value";
}

function readTime(value?: string): TimeFilter {
  return value === "early" || value === "day" || value === "evening" || value === "red_eye"
    ? value
    : "any";
}

function readStops(value?: string): StopsFilter {
  return value === "direct" || value === "one_stop" ? value : "any";
}

function readBaggage(value?: string): BaggageFilter {
  return value === "checked" || value === "carry_only" ? value : "any";
}

function readFlexibility(value?: string): FlexibilityFilter {
  return value === "flexible" || value === "strict" ? value : "any";
}

export function parseSearchQuery(searchParams: SearchParamsInput): SearchQuery {
  const passengers = Number(readValue(searchParams, "passengers") ?? DEFAULT_QUERY.passengers);
  const from = readValue(searchParams, "from") ?? DEFAULT_QUERY.from;
  const to = readValue(searchParams, "to") ?? DEFAULT_QUERY.to;
  const departDate = readValue(searchParams, "departDate") ?? DEFAULT_QUERY.departDate;
  const returnDate = readValue(searchParams, "returnDate") ?? "";
  const scene = readValue(searchParams, "scene") ?? DEFAULT_QUERY.scene;

  return {
    from,
    to,
    departDate,
    returnDate,
    tripType: readTripType(readValue(searchParams, "tripType")),
    passengers: Number.isFinite(passengers) && passengers > 0 ? passengers : DEFAULT_QUERY.passengers,
    sort: readSort(readValue(searchParams, "sort")),
    scene,
    time: readTime(readValue(searchParams, "time")),
    stops: readStops(readValue(searchParams, "stops")),
    baggage: readBaggage(readValue(searchParams, "baggage")),
    flexibility: readFlexibility(readValue(searchParams, "flexibility")),
    hideRisk: readValue(searchParams, "hideRisk") === "1"
  };
}

export function buildResultsHref(patch?: Partial<SearchQuery>): string {
  const merged = { ...DEFAULT_QUERY, ...patch };
  const params = new URLSearchParams();
  params.set("from", merged.from);
  params.set("to", merged.to);
  params.set("departDate", merged.departDate);
  if (merged.returnDate) {
    params.set("returnDate", merged.returnDate);
  }
  params.set("tripType", merged.tripType);
  params.set("passengers", String(merged.passengers));
  params.set("sort", merged.sort);
  params.set("scene", merged.scene);
  if (merged.time !== "any") {
    params.set("time", merged.time);
  }
  if (merged.stops !== "any") {
    params.set("stops", merged.stops);
  }
  if (merged.baggage !== "any") {
    params.set("baggage", merged.baggage);
  }
  if (merged.flexibility !== "any") {
    params.set("flexibility", merged.flexibility);
  }
  if (merged.hideRisk) {
    params.set("hideRisk", "1");
  }

  return `/results?${params.toString()}`;
}

export function mergeSearchQuery(query: SearchQuery, patch: Partial<SearchQuery>): SearchQuery {
  return { ...query, ...patch };
}
