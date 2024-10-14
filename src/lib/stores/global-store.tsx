import { createStore } from 'zustand/vanilla';
import { Account } from '@/lib/types';

export type GlobalState = {
    currentSelectedAccount?: Account | null;
    imageHash: Map<string, string>;
    searchValue: string;
};

export type GlobalActions = {
    setCurrentSelectedAccount: (account: Account | undefined | null) => void;
    setImageHash: (imageHash: Map<string, string>) => void;
    setSearchValue: (searchValue: string) => void;
};

export type GlobalStore = GlobalState & GlobalActions;

export const defaultGlobalState: GlobalState = {
    currentSelectedAccount: null,
    imageHash: new Map<string, string>,
    searchValue: '',
};

export const createGlobalStore = (initstate: GlobalState = defaultGlobalState) => {
    return createStore<GlobalStore>(set => ({
        ...initstate,
        setCurrentSelectedAccount: (account: Account | undefined | null) => set(state => ({ ...state, currentSelectedAccount: account })),
        setImageHash: (imageHash: Map<string, string>) => set(state => ({ ...state, imageHash: imageHash })),
        setSearchValue: (searchValue: string) => set(state => ({ ...state, searchValue: searchValue })),
    }));
};
