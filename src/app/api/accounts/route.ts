import { connect } from '@/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET() {
    const db = await connect();
    if (!db) {
        return NextResponse.json({
            message: 'Error connect to database',
        });
    }
    const accounts = await db
        .collection('accounts')
        .find({})
        .toArray();

    return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
    const { id, field, newValue } = await req.json();
    const db = await connect();
    if (!db) {
        return NextResponse.json({
            message: 'Error connect to database',
        });
    }
    const account = await db.collection('accounts').updateOne(
        { _id: ObjectId.createFromHexString(id) },
        {
            $set: {
                [field]: newValue,
            },
        },
    );

    return NextResponse.json(account);
}
