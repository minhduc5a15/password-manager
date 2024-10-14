import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db/mongodb';
import { Account } from '@/lib/models/account.model';
import { ObjectId } from 'mongodb';

export async function getAccounts(_req: NextRequest, _res: NextResponse) {
    const db = await connect();

    if (!db) {
        return NextResponse.json({
            message: 'Error connect to database',
        });
    }

    try {
        const accounts = await db
            .collection('accounts')
            .find({})
            .toArray();

        return NextResponse.json(accounts);
    } catch (err) {
        return NextResponse.json({
            message: 'Something went wrong',
            error: err,
        });
    }
}

export async function createAccount(req: NextRequest, _res: NextResponse) {
    const db = await connect();

    if (!db) {
        return NextResponse.json({
            message: 'Error connect to database',
        });
    }

    const data = await req.json();

    try {
        const newAccount = new Account(data);

        await newAccount.save();

        return NextResponse.json({
            message: 'Successfully created account',
        });
    } catch (err) {
        return NextResponse.json({
            message: 'Error creating account',
            error: err,
        });
    }
}

export async function deleteAccount(_req: NextRequest, { params }: { params: { id: string } }) {
    const db = await connect();

    if (!db) {
        return NextResponse.json({
            message: 'Error connect to database',
        });
    }

    const { id } = params;

    try {
        const _id = ObjectId.createFromHexString(id);

        const account = await db.collection('accounts').findOne({ _id });

        await db.collection('trash').insertOne(account!);
        await db.collection('accounts').deleteOne({
            _id,
        });
        if (!account) {
            return NextResponse.json({
                message: 'Account not found',
            });
        }

        return NextResponse.json(account);
    } catch (err) {
        return NextResponse.json({
            message: 'Error deleting account',
            error: err,
        });
    }
}
