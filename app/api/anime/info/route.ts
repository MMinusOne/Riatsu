import { NextResponse } from 'next/server';
import * as consumet from '@consumet/extensions'
import { HttpStatusCode } from 'axios';

const anify = new consumet.ANIME.Anify();


export async function POST(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: "No id was provided " }, { status: HttpStatusCode.BadRequest })
    }

    try {
        const anifyInfo = await anify.fetchAnimeInfo(id);

        return NextResponse.json(anifyInfo);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e, { status: HttpStatusCode.InternalServerError })
    }
}
