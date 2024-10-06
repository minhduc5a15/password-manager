import { createStore } from 'zustand/vanilla';
import { Account } from '@/lib/types';

export type GlobalState = {
    currentSelectedAccount: Account | null;
    imageHash: Map<string, string>;
};

export type GlobalActions = {
    setCurrentSelectedAccount: (account: Account) => void;
    setImageHash: (imageHash: Map<string, string>) => void;
};

export type GlobalStore = GlobalState & GlobalActions;

export const defaultGlobalState: GlobalState = {
    currentSelectedAccount: null,
    imageHash: new Map<string, string>,
};

export const createGlobalStore = (initstate: GlobalState = defaultGlobalState) => {
    return createStore<GlobalStore>(set => ({
        ...initstate,
        setCurrentSelectedAccount: (account: Account) => set(state => ({ ...state, currentSelectedAccount: account })),
        setImageHash: (imageHash: Map<string, string>) => set(state => ({ ...state, imageHash: imageHash })),
    }));
};
