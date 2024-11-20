import * as consumet from "@consumet/extensions";

const zoro = new consumet.ANIME.Zoro();

export async function GET() {
  const trendingPage = await zoro.fetchMostPopular();
  const { results: trendingResults } = trendingPage;

  return Response.json(trendingResults);
}
