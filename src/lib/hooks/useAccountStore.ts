import { useAccountStore as useStore } from '@/lib/providers/account-provider';

export const useAccountStore = () => {
    return useStore(state => state);
};
