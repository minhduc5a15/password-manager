"use server";

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MongoDB URI is missing');
}

export const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected!');
        return mongoose.connection;
    } catch (error) {
        console.error(error);
        return null;
    }
};
