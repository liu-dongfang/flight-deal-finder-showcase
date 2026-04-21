import { ResultsPage } from "@/components/redesign/results-page";
import { parseSearchQuery } from "@/lib/utils/query";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initialQuery = parseSearchQuery(await searchParams);

  return <ResultsPage initialQuery={initialQuery} />;
}
