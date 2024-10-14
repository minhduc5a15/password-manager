import { type Account } from '@/lib/types';

export const formatSearchValue = (searchValue: string) => {
    const lower = searchValue.toLowerCase();
    if (lower.slice(-1) == '') {
        return lower.slice(0, searchValue.length - 1);
    }
    return lower;
};

