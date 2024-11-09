"use server";

import { ClientAnimeWiki } from "./ClientAnimeWiki";

export default async function AnimeWikiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <></>;
  }

  return <ClientAnimeWiki id={id} />;
}
