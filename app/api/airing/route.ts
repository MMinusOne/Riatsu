import * as consumet from '@consumet/extensions'

const gogoAnime = new consumet.ANIME.Gogoanime();

export async function GET() {
    const airingSchedule = await gogoAnime.fetchTopAiring();
    const { results: airingResults } = airingSchedule;
    
    return Response.json(airingResults);
}