import { NextResponse } from "next/server";
import * as consumet from "@consumet/extensions";
import axios, { HttpStatusCode } from "axios";

const gogoAnime = new consumet.ANIME.Gogoanime();

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "No id was provided" },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    const { data } = await axios.get(
      `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/anime/${id}.json`
    );
    const gogoIds = Object.keys(data?.Sites?.Gogoanime);
    const animeInfo = await gogoAnime.fetchAnimeInfo(gogoIds?.at(0));

    return NextResponse.json(animeInfo.episodes?.map((e) => e.id));
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
