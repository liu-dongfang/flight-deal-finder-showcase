import { Suspense } from "react";
import { ResultsExperience } from "@/components/results/results-experience";
import { parseSearchQuery } from "@/lib/utils/query";

export const dynamic = "force-dynamic";

export default async function ResultsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initialQuery = parseSearchQuery(await searchParams);

  return (
    <Suspense fallback={<main className="page page-results"><section className="empty-state"><h2>正在准备结果页…</h2></section></main>}>
      <ResultsExperience initialQuery={initialQuery} />
    </Suspense>
  );
}
