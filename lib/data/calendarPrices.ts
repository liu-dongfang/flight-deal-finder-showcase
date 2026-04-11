import type { CalendarPriceRecord } from "@/lib/types";

const buildWindow = (
  routeId: string,
  prices: number[],
  flightIds: string[]
): CalendarPriceRecord => ({
  calendarId: `${routeId}_calendar`,
  routeId,
  passengerCount: 1,
  prices: [
    "2026-05-13",
    "2026-05-14",
    "2026-05-15",
    "2026-05-16",
    "2026-05-17",
    "2026-05-18",
    "2026-05-19"
  ].map((date, index) => ({
    date,
    lowestTotalPrice: prices[index],
    priceLevel: index === 3 || index === 4 ? "low" : index === 0 || index === 6 ? "high" : "medium",
    flightIds
  }))
});

export const calendarPrices: CalendarPriceRecord[] = [
  buildWindow("sha_tyo", [759, 739, 719, 699, 649, 719, 799], [
    "sha_tyo_f1",
    "sha_tyo_f2",
    "sha_tyo_f3",
    "sha_tyo_f4"
  ]),
  buildWindow("sha_osa", [639, 619, 599, 629, 649, 689, 709], [
    "sha_osa_f1",
    "sha_osa_f2",
    "sha_osa_f3",
    "sha_osa_f4"
  ]),
  buildWindow("pek_sel", [579, 559, 529, 499, 539, 579, 609], [
    "pek_sel_f1",
    "pek_sel_f2",
    "pek_sel_f3",
    "pek_sel_f4"
  ]),
  buildWindow("can_bkk", [879, 829, 799, 799, 859, 899, 939], [
    "can_bkk_f1",
    "can_bkk_f2",
    "can_bkk_f3",
    "can_bkk_f4"
  ]),
  buildWindow("szx_sin", [1099, 1049, 1019, 999, 1049, 1099, 1149], [
    "szx_sin_f1",
    "szx_sin_f2",
    "szx_sin_f3",
    "szx_sin_f4"
  ]),
  buildWindow("ctu_hkg", [529, 499, 469, 449, 479, 519, 559], [
    "ctu_hkg_f1",
    "ctu_hkg_f2",
    "ctu_hkg_f3",
    "ctu_hkg_f4"
  ]),
  buildWindow("hgh_kul", [999, 949, 919, 899, 939, 989, 1039], [
    "hgh_kul_f1",
    "hgh_kul_f2",
    "hgh_kul_f3",
    "hgh_kul_f4"
  ]),
  buildWindow("ckg_mfm", [459, 429, 399, 399, 449, 489, 529], [
    "ckg_mfm_f1",
    "ckg_mfm_f2",
    "ckg_mfm_f3",
    "ckg_mfm_f4"
  ])
];
