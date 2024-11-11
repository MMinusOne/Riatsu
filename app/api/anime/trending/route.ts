import * as consumet from '@consumet/extensions'

const anilist = new consumet.META.Anilist();

export async function GET() {
    const trendingPage = await anilist.fetchTrendingAnime();
    const { results: trendingResults } = trendingPage;

    // Fetch banner for each trending anime
    // const resultsWithBanners = await Promise.all(
    //     trendingResults.map(async (anime: any) => {
    //         try {
    //             const info = await anify.fetchAnimeInfo(anime.id);
    //             const banner = info?.artwork?.find((e: { type: string }) => e.type === 'banner');
    //             if (banner?.img) {
    //                 return {
    //                     ...anime,
    //                     banner: banner.img
    //                 };
    //             }
    //         } catch (error) {
    //             // Handle error if needed
    //         }
    //         return null; // Return null if no banner is found
    //     })
    // );

    // Filter out null values
    // const filteredResults = resultsWithBanners.filter(anime => anime !== null);

    return Response.json(trendingResults);
}