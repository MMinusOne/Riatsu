"use client";

import SearchTable from "@/components/search/SearchTable";
import searchContent from "@/lib/services/searchContent";
import { useQuery } from "@tanstack/react-query";

export default function SearchContentPage({ q }: { q: string }) {
  const { data: searchResults, isLoading: searchResultsLoading } = useQuery({
    queryKey: ["search", q],
    queryFn: () => searchContent(q),
  });

  if (searchResultsLoading) {
    return (<></>)
  }

  return (
    <>
      {!searchResultsLoading ? (
        <SearchTable data={searchResults} type="anime" />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      )}
    </>
  );
}
