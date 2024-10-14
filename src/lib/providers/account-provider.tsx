'use client';

import React, { useRef, ReactNode, createContext, useContext, useEffect } from 'react';
import { useStore } from 'zustand';

import { createAccountStore, type AccountStore } from '@/lib/stores/account-store';
import { type Account, AccountInfo } from '@/lib/types';
import { Multimap } from '@/lib/multimap';
import { useAccount } from '@/lib/hooks/useAccount';

export const AccountContext = createContext<ReturnType<typeof createAccountStore> | undefined>(undefined);

export interface AccountProviderProps {
    children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const store = useRef(createAccountStore());
    const { setAccountList, setAccountMap, setAccountIdMap } = store.current.getState();

    const { isPending, accounts } = useAccount();

    useEffect(() => {
        if (isPending || !Array.isArray(accounts)) return;
        setAccountList(accounts);

        const newAccountMap = new Multimap<string, Account>();
        const newAccountIdMap = new Map<string, AccountInfo>();

        accounts.forEach(account => {
            newAccountMap.set(account.platform, account);
            newAccountIdMap.set(account['_id'], account as AccountInfo);
        });
        setAccountMap(newAccountMap);
        setAccountIdMap(newAccountIdMap);
    }, [accounts, isPending, setAccountIdMap, setAccountList, setAccountMap]);

    return <AccountContext.Provider value={store.current}>{children}</AccountContext.Provider>;
};

export const useAccountStore = <T, >(selector: (store: AccountStore) => T): T => {
    const accountStoreContext = useContext(AccountContext);

    if (!accountStoreContext) {
        throw new Error('useAccountStore must be used within the AccountProvider');
    }

    return useStore(accountStoreContext, selector);
};

