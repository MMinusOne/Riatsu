import { NextResponse } from "next/server";
import * as consumet from "@consumet/extensions";
import axios, { HttpStatusCode } from "axios";

// const gogoAnime = new consumet.ANIME.Gogoanime();
const zoroAnime = new consumet.ANIME.Zoro();

export async function POST(request: Request) {
  const { episodeId } = await request.json();

  if (!episodeId) {
    return NextResponse.json(
      { error: "No id was provided" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    // const episodeSource = await gogoAnime.fetchEpisodeSources(episodeId);
    const episodeSource = await zoroAnime.fetchEpisodeSources(episodeId);
    return NextResponse.json(episodeSource);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
