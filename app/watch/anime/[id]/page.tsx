import Header from "@/components/misc/Header";
import WatchPageContent from "./WatchPageContent";

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ep: number }>;
}) {
  const { id } = await params;
  let { ep } = await searchParams;

  return (
    <>
      <Header />
      <WatchPageContent id={id} ep={ep} />
    </>
  );
}
