import { createStore } from 'zustand/vanilla';
import { type Account } from '@/lib/types';
import { Multimap } from '@/lib/multimap';

export type AccountState = {
    accountMap: Multimap<string, Account>;
    accountList: Account[];
}

export type AccountActions = {
    setAccountMap: (accountMap: Multimap<string, Account>) => void;
    setAccountList: (accountList: Account[]) => void;
}

export type AccountStore = AccountState & AccountActions;

export const defaultAccountState: AccountState = {
    accountMap: new Multimap<string, Account>(),
    accountList: [] as Account[],
};

export const createAccountStore = (initstate: AccountState = defaultAccountState) => {
    return createStore<AccountStore>(set => ({
        ...initstate,
        setAccountMap: (accountMap: Multimap<string, Account>) => set(state => ({ ...state, accountMap: accountMap })),
        setAccountList: (accountList: Account[]) => set(state => ({ ...state, accountList: accountList })),
    }));
};