import { NextResponse } from 'next/server';
import { connect } from '@/lib/db/mongodb';

export async function GET() {
    const db = await connect();

    if (!db) {
        return NextResponse.json({
            message: 'Error connect to database',
        });
    }
    try {
        const accounts = await db
            .collection('trash')
            .find()
            .toArray();
        return NextResponse.json(accounts);
    } catch (err) {
        return NextResponse.json({
            message: 'Something went wrong',
            error: err,
        });
    }
}
