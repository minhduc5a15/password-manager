export type Account = {
    username: string;
    password: string;
    email: string;
    platform: string;
    [key: string]: string;
};

export type AccountInfo = Omit<Account, '_id'>
