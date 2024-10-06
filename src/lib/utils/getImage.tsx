'use server';

import { storage } from '@/lib/db/firebase';

export const getImagePromise = async (path: string) => {
    return await storage.ref(path).getDownloadURL();
};

export const getListAll = async (path?: string) => {
    return await storage.ref(path).listAll();
};
