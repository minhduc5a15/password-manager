'use server';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connect } from '@/lib/db/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
}

export async function POST(req: Request) {
    const db = await connect();

    if (!db) {
        return NextResponse.json(
            {
                message: 'Error connect to database',
            },
            {
                status: 500,
            },
        );
    }

    try {
        const { username, password } = await req.json();

        const admin = await db.collection('admins').findOne({ username });

        if (!admin) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                {
                    status: 500,
                },
            );
        }

        if (admin.password !== password) {
            return NextResponse.json(
                {
                    message: 'Username or password is incorrect',
                },
                {
                    status: 500,
                },
            );
        }
        const { password: _, ...rest } = admin;
        const token = jwt.sign({ ...rest }, JWT_SECRET as string, {
            expiresIn: '1d',
        });

        cookies().set('authToken', token, {
            maxAge: 60 * 60 * 24,
            sameSite: true,
        });

        return NextResponse.json({
            token,
            data: rest,
            message: 'Sign in successful',
        });
    } catch (err) {
        return NextResponse.json(
            {
                message: 'Something went wrong',
                error: err,
            },
            {
                status: 500,
            },
        );
    }
}
