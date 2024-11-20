import * as consumet from "@consumet/extensions";

const zoro = new consumet.ANIME.Zoro();

export async function POST(request: Request) {
  const { q } = await request.json();
  const searchPage = await zoro.search(q);
  const { results: searchResults } = searchPage;

  return Response.json(searchResults);
}
