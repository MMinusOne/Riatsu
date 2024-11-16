import * as consumet from '@consumet/extensions'

const anilist = new consumet.META.Anilist();

export async function GET() {
    const trendingPage = await anilist.fetchTrendingAnime();
    const { results: trendingResults } = trendingPage;

    return Response.json(trendingResults);
}