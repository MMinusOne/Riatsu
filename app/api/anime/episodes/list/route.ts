import { NextResponse } from "next/server";
import * as consumet from "@consumet/extensions";
import axios, { HttpStatusCode } from "axios";

const gogo = new consumet.ANIME.Gogoanime();

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
    console.log(data?.Sites?.Gogoanime, gogoIds)
    const gogoId = data?.Sites?.Gogoanime[gogoIds?.at(0)]?.url?.split("/").at(-1);
    console.log(gogoId);
    const animeInfo = await gogo.fetchAnimeInfo(gogoId);
    return NextResponse.json(animeInfo.episodes);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
