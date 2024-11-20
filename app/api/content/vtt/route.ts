import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vttUrl = searchParams.get('url');

  if (!vttUrl) {
    return NextResponse.json({ error: 'Missing "url" search parameter' }, { status: 400 });
  }

  const response = await fetch(vttUrl);

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch the VTT file' }, { status: response.status });
  }

  const vttContent = await response.text();
  return new Response(vttContent, {
    headers: {
      'Content-Type': 'text/vtt',
    },
  });
}
