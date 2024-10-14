import { createStore } from 'zustand/vanilla';
import { type Account, type AccountInfo } from '@/lib/types';
import { Multimap } from '@/lib/multimap';

export type AccountState = {
    accountMap: Multimap<string, Account>;
    accountIdMap: Map<string, AccountInfo>;
    accountList: Account[];
    accountDeleted?: Account[]
}

export type AccountActions = {
    setAccountMap: (accountMap: Multimap<string, Account>) => void;
    setAccountList: (accountList: Account[]) => void;
    setAccountIdMap: (accountIdMap: Map<string, AccountInfo>) => void;
    setAccountDeleted: (accountDeleted: Account[]) => void;
    reload: (accounts: Account[]) => void;
}

export type AccountStore = AccountState & AccountActions;

export const defaultAccountState: AccountState = {
    accountMap: new Multimap<string, Account>(),
    accountIdMap: new Map<string, AccountInfo>(),
    accountList: [] as Account[],
};

export const createAccountStore = (initstate: AccountState = defaultAccountState) => {
    return createStore<AccountStore>(set => ({
        ...initstate,
        setAccountMap: (accountMap: Multimap<string, Account>) => set(state => ({ ...state, accountMap: accountMap })),
        setAccountList: (accountList: Account[]) => set(state => ({ ...state, accountList: accountList })),
        setAccountIdMap: (accountIdMap: Map<string, AccountInfo>) => set(state => ({ ...state, accountIdMap: accountIdMap })),
        setAccountDeleted: (accountDeleted: Account[]) => set(state => ({ ...state, accountDeleted: accountDeleted })),
        reload: (accounts: Account[]) => {
            const newAccountMap = new Multimap<string, Account>();
            const newAccountIdMap = new Map<string, AccountInfo>();

            accounts.forEach(account => {
                newAccountMap.set(account.platform, account);
                newAccountIdMap.set(account['_id'], account as AccountInfo);
            });

            set(state => ({
                ...state,
                accountList: accounts,
                accountMap: newAccountMap,
                accountIdMap: newAccountIdMap,
            }));
        },
    }));
};
