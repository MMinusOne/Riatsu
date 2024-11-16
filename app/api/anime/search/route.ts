import * as consumet from "@consumet/extensions";

const anilist = new consumet.META.Anilist();

export async function POST(req) {
  const { query } = await req.json();
  const searchPage = await anilist.search(query);
  const { results: searchResults } = searchPage;

  return Response.json(searchResults);
}
