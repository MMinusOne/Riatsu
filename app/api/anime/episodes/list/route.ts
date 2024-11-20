import { NextResponse } from "next/server";
import * as consumet from "@consumet/extensions";
import axios, { HttpStatusCode } from "axios";

// const gogo = new consumet.ANIME.Gogoanime();
const zoro = new consumet.ANIME.Zoro();

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "No id was provided" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    // const gogoIds = Object.keys(data?.Sites?.Gogoanime);
    // console.log(data?.Sites?.Gogoanime, gogoIds)
    // const gogoId = gogoIds.at(0);
    // console.log(gogoId);
    // const animeInfo = await gogo.fetchAnimeInfo(gogoId);
    const animeInfo = await zoro.fetchAnimeInfo(id);
    const dubEpisodes = [];
    const subEpisodes = [];
    for (const episode of animeInfo?.episodes || []) {
      const episodeId = episode.id.split("$").slice(0, -1).join("$");
      const episodeSubOrDub = episode.id.split("$").at(-1);

      if (episodeSubOrDub === "both") {
        dubEpisodes.push({ ...episode, id: `${episodeId}$dub` });
        subEpisodes.push({ ...episode, id: `${episodeId}$sub` });
      } else if (episodeSubOrDub === "sub") {
        subEpisodes.push({ ...episode, id: `${episodeId}$sub` });
      }
    }
    return NextResponse.json({ subEpisodes, dubEpisodes });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
