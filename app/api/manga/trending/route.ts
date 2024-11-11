import consumet from '@consumet/extensions';
import { HttpStatusCode } from 'axios'

const mangaDex = new consumet.MANGA.MangaDex()

export async function GET() {
    try {
        const popular = await mangaDex.fetchPopular(1, 10);
        return Response.json(popular.results, { status: HttpStatusCode.Ok })
    } catch (e) {
        return Response.json(e, { status: HttpStatusCode.InternalServerError })
    }
}