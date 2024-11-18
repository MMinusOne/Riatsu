import * as consumet from "@consumet/extensions";

const anilist = new consumet.META.Anilist();

export async function POST(request: Request) {
  const { q } = await request.json();
  const searchPage = await anilist.search(q);
  const { results: searchResults } = searchPage;

  return Response.json(searchResults);
}
