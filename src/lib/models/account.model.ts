import mongoose, { Schema } from 'mongoose';

export const AccountSchema = new Schema(
    {
        platform: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        strict: false,
    },
);

export const Account = mongoose.models.account || mongoose.model('account', AccountSchema);
