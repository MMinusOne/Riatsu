import * as consumet from "@consumet/extensions";

const anilist = new consumet.META.Anilist();

export async function POST(req) {
  const { q } = await req.json();
  const searchPage = await anilist.search(q);
  console.log({ q })
  const { results: searchResults } = searchPage;

  return Response.json(searchResults);
}
