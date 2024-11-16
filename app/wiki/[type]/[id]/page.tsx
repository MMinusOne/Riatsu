"use server";

import { ClientWiki } from "./ClientWiki";

export default async function AnimeWikiPage({
  params,
}: {
  params: Promise<{ id: string; type: "manga" | "movie" | "anime" }>;
}) {
  const { id, type } = await params;

  if (!id) {
    return <></>;
  }

  return <ClientWiki id={id} type={type} />;
}
