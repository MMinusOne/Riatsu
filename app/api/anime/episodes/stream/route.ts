import { NextResponse } from "next/server";
import * as consumet from "@consumet/extensions";
import axios, { HttpStatusCode } from "axios";

const gogoAnime = new consumet.ANIME.Gogoanime();

export async function POST(request: Request) {
  const { episodeId } = await request.json();
  console.log({ episodeId });
  if (!episodeId) {
    return NextResponse.json(
      { error: "No id was provided" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    const episodeSource = await gogoAnime.fetchEpisodeSources(episodeId);
    return NextResponse.json(episodeSource);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
