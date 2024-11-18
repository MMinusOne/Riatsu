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
    const { data } = await axios.get(
      `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/anime/${id}.json`
    );
    // const gogoIds = Object.keys(data?.Sites?.Gogoanime);
    // console.log(data?.Sites?.Gogoanime, gogoIds)
    // const gogoId = gogoIds.at(0);
    // console.log(gogoId);
    // const animeInfo = await gogo.fetchAnimeInfo(gogoId);

    const zoroKeys = [...Object.keys(data?.Sites?.Zoro)];
    const zoroKey = zoroKeys.at(0);
    const zoroId = data?.Sites?.Zoro[zoroKey!]?.url?.split("/").at(-1);
    console.log(data?.Sites?.Zoro);
    const animeInfo = await zoro.fetchAnimeInfo(zoroId);

    return NextResponse.json(animeInfo.episodes);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
