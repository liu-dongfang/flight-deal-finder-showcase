export type TripType = "one_way" | "round_trip";
export type ChangePolicyLevel = "flexible" | "limited" | "strict";
export type RiskTag =
  | "red_eye"
  | "self_transfer"
  | "cross_terminal"
  | "tight_connection"
  | "no_checked_baggage";
export type AiReviewSeed =
  | "cheap_real"
  | "cheap_trap"
  | "value_best"
  | "balanced_pick";
export type RecommendationType =
  | "budget_pick"
  | "balanced_pick"
  | "risk_pick"
  | "comfort_pick";
export type SortMode = "cheapest" | "best_value";
export type TimeFilter = "any" | "early" | "day" | "evening" | "red_eye";
export type StopsFilter = "any" | "direct" | "one_stop";
export type BaggageFilter = "any" | "checked" | "carry_only";
export type FlexibilityFilter = "any" | "flexible" | "strict";

export interface SearchQuery {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  tripType: TripType;
  passengers: number;
  sort: SortMode;
  scene: string;
  time: TimeFilter;
  stops: StopsFilter;
  baggage: BaggageFilter;
  flexibility: FlexibilityFilter;
  hideRisk: boolean;
}

export interface RouteRecord {
  routeId: string;
  originCity: string;
  originAirportCode: string;
  originAirportName: string;
  destinationCity: string;
  destinationAirportCode: string;
  destinationAirportName: string;
  tripType: TripType;
  sceneTags: string[];
  typicalPriceRange: string;
  heroLabel: string;
}

export interface FlightTemplate {
  flightId: string;
  routeId: string;
  airlineName: string;
  flightNumber: string;
  departAirportCode: string;
  arriveAirportCode: string;
  departTimeLocal: string;
  arriveTimeLocal: string;
  arrivalDayOffset: number;
  durationMinutes: number;
  stopCount: 0 | 1;
  stopSummary: string;
  isRedEye: boolean;
  isSelfTransfer: boolean;
  isCrossTerminal: boolean;
  transferMinutes: number;
  transferAirportName?: string;
  transferAirportCode?: string;
  baseFare: number;
  taxFee: number;
  carryOnBaggage: string;
  checkedBaggage: string;
  checkedBaggageFeeHint: string;
  changePolicyLevel: ChangePolicyLevel;
  refundPolicySummary: string;
  riskTags: RiskTag[];
  aiReviewSeed: AiReviewSeed;
  recommendationType: RecommendationType;
}

export interface CalendarPriceItem {
  date: string;
  lowestTotalPrice: number;
  priceLevel: "low" | "medium" | "high";
  flightIds: string[];
}

export interface CalendarPriceRecord {
  calendarId: string;
  routeId: string;
  passengerCount: number;
  prices: CalendarPriceItem[];
}

export interface SceneRecord {
  sceneId: string;
  title: string;
  subtitle: string;
  presetQuery: Partial<SearchQuery>;
  routeIds: string[];
  coverStyleToken: string;
}

export interface FeaturedDealRecord {
  dealId: string;
  routeId: string;
  title: string;
  subtitle: string;
  fromPrice: number;
  travelWindow: string;
  highlightTags: string[];
  targetQuery: Partial<SearchQuery>;
}

export interface AiReview {
  short: string;
  detail: string;
}

export interface FlightResult extends FlightTemplate {
  route: RouteRecord;
  departDateTime: string;
  arriveDateTime: string;
  totalPrice: number;
  bestValueScore: number;
  priceRank: number;
  priceGapFromCheapest: number;
  aiReview: AiReview;
  labels: string[];
}

export interface ResultsExperience {
  query: SearchQuery;
  route: RouteRecord | null;
  flights: FlightResult[];
  flightsBeforeFilters: FlightResult[];
  calendarItems: CalendarPriceItem[];
  selectedCalendarDate: string;
  hasExactRoute: boolean;
}
