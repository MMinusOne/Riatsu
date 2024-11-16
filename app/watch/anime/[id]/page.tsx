import Header from "@/components/blocks/home/Header";
import WatchPageContent from "./WatchPageContent";

export default async function WatchPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  if (!id) {
    return <></>;
  }

  return (
    <>
      <Header />
      <WatchPageContent id={id} />
    </>
  );
}
