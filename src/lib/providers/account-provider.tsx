'use client';

import React, { useRef, ReactNode, createContext, useContext, useEffect } from 'react';
import { useStore } from 'zustand';

import { createAccountStore, type AccountStore } from '@/lib/stores/account-store';
import { type Account } from '@/lib/types';
import { Multimap } from '@/lib/multimap';
import { useAccountQuery } from '@/lib/hooks/useAccount';

export const AccountContext = createContext<ReturnType<typeof createAccountStore> | undefined>(undefined);

export interface AccountProviderProps {
    children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const store = useRef(createAccountStore());
    const { setAccountList, setAccountMap } = store.current.getState();

    const { isPending, data } = useAccountQuery();

    useEffect(() => {
        if (isPending || !data) return;
        setAccountList(data!);

        const newMap = new Multimap<string, Account>();

        data.forEach(account => {
            newMap.set(account.platform, account);
        });
        setAccountMap(newMap);

    }, [data, isPending, setAccountList, setAccountMap]);

    return <AccountContext.Provider value={store.current}>{children}</AccountContext.Provider>;
};

export const useAccountStore = <T, >(selector: (store: AccountStore) => T): T => {
    const accountStoreContext = useContext(AccountContext);

    if (!accountStoreContext) {
        throw new Error('useAccountStore must be used within the AccountProvider');
    }

    return useStore(accountStoreContext, selector);
};

