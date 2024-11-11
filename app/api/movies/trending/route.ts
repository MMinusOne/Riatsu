import consumet from "@consumet/extensions";
import { HttpStatusCode } from "axios";

const tmdb = new consumet.META.TMDB();

export async function GET() {
  try {
    const popular = await tmdb.fetchTrending("all");
    return Response.json(popular.results, { status: HttpStatusCode.Ok });
  } catch (e) {
    return Response.json(e, { status: HttpStatusCode.InternalServerError });
  }
}
