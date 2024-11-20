import Header from "@/components/misc/Header";
import SearchContentPage from "./SearchContentPage";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <Header />
      <SearchContentPage q={q} />
    </>
  );
}
