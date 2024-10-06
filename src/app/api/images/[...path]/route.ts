import { NextRequest, NextResponse } from 'next/server';
import { getImagePromise } from '@/lib/utils/getImage';

export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
    const { path } = params;
    const newPath = path.join('/');

    try {
        const res = await getImagePromise(newPath);

        const response = NextResponse.json(res);

        response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}

