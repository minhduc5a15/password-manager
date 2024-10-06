export type Account = {
    username: string;
    password: string;
    email: string;
    platform: string;
    [key: string]: string;
};

export type Image = {
    name: string;
    base64: string;
    url?: string;
};
