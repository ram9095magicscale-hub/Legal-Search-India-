import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    const fileName = searchParams.get('name') || 'document';

    if (!fileUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Failed to fetch file');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get the original content type or fallback
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Download Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
