import { NextResponse } from "next/server";
import * as consumet from "@consumet/extensions";
import axios, { HttpStatusCode } from "axios";

const zoro = new consumet.ANIME.Zoro();
const anilist = new consumet.META.Anilist();

export async function POST(request: Request) {
  const { id, subOrDub } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "No id was provided " },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    const zoroInfo = await zoro.fetchAnimeInfo(id);
    const dubEpisodes = [];
    const subEpisodes = [];
    for (const episode of zoroInfo?.episodes || []) {
      const episodeId = episode.id.split("$").slice(0, -1).join("$");
      const episodeSubOrDub = episode.id.split("$").at(-1);

      if (episodeSubOrDub === "both") {
        dubEpisodes.push({ ...episode, id: `${episodeId}$dub` });
        subEpisodes.push({ ...episode, id: `${episodeId}$both` });
      } else if (episodeSubOrDub === "sub") {
        subEpisodes.push({ ...episode, id: `${episodeId}$both` });
      }
    }
    let anilistInfo = {};
    try {
      anilistInfo = await anilist.fetchAnimeInfo(zoroInfo.alID);
    } catch (error) {
      console.log("Anilist fetch error:", error);
      anilistInfo = {};
    }
    return NextResponse.json({
      zoroInfo,
      anilistInfo,
      subEpisodes,
      dubEpisodes,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: HttpStatusCode.InternalServerError });
  }
}
