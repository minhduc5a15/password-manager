'use client';

import { useStore } from 'zustand';
import React, { useRef, type ReactNode, createContext, useContext, useEffect } from 'react';

import { createGlobalStore, type GlobalStore } from '@/lib/stores/global-store';
import { useAccountStore } from '@/lib/providers/account-provider';
import axios from 'axios';

export const GlobalContext = createContext<ReturnType<typeof createGlobalStore> | undefined>(undefined);

export interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const store = useRef(createGlobalStore());
    const { setImageHash } = store.current.getState();
    const { accountMap } = useAccountStore(state => state);

    useEffect(() => {
        const fetchImages = async () => {
            const temp = new Map<string, string>();
            const promises = Array.from(accountMap.keys()).map(async key => {
                try {
                    const res = await axios.get(`/api/images/logo/${key}.png`);
                    temp.set(key, res.data);
                } catch {}
            });

            await Promise.all(promises);
            setImageHash(temp);
        };

        fetchImages();
    }, [accountMap, setImageHash]);


    return <GlobalContext.Provider value={store.current}>{children}</GlobalContext.Provider>;
};

export const useGlobalStore = <T, >(selector: (store: GlobalStore) => T): T => {
    const globalStoreContext = useContext(GlobalContext);

    if (!globalStoreContext) {
        throw new Error('useGlobalStore must be used within the GlobalProvider');
    }

    return useStore(globalStoreContext, selector);
};