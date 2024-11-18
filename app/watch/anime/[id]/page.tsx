import Header from "@/components/home/Header";
import WatchPageContent from "./WatchPageContent";

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: { id: string };
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
