import { useGlobalStore as useStore } from '@/lib/providers/global-provider';

export const useGlobalStore = () => {
    return useStore(state => state);
};
