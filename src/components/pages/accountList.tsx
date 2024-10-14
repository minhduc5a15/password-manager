import type { Account } from '@/lib/types';
import { ScrollArea } from '@/components/ui';
import { AccountItem } from '@/components/pages/accountItem';
import { v4 } from 'uuid';
import { ChevronRight } from 'lucide-react';
import { useGlobalStore } from '@/lib/providers/global-provider';
import { useEffect, useMemo, useState } from 'react';
import { formatSearchValue } from '@/lib/utils/search';

export const AccountList = ({ accounts }: { accounts: Account[] }) => {
    const { currentSelectedAccount, searchValue } = useGlobalStore(state => state);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchValue(searchValue), 150);
        return () => clearTimeout(handler);
    }, [searchValue]);

    const accountList: Account[] = useMemo(() => {
        const val = formatSearchValue(debouncedSearchValue);
        return accounts.filter(account => {
            return (
                account.platform.toLowerCase().includes(val) ||
                account.email.toLowerCase().includes(val) ||
                account.username.toLowerCase().includes(val)
            );
        });
    }, [accounts, debouncedSearchValue]);
    if (accounts.length === 0) return null;

    return (
        <ScrollArea className={'flex flex-1 flex-col max-h-screen overflow-auto'}>
            {accountList.length ? accountList.map((item) => (
                <div className={'w-auto h-auto relative'} key={v4()}>
                    <AccountItem
                        className={`border-2 cursor-pointer ${currentSelectedAccount === item && 'bg-white/10'} hover:bg-white/10 relative`} account={item}
                    />
                    <span className={'absolute right-0 h-full w-10 top-0 flex justify-center items-center'}>
                    <ChevronRight className={'size-4'} />
                </span>
                </div>
            )) : <div className={'w-full h-full flex items-center justify-center'}>
                <h1>No account matches your search</h1>
            </div>}
        </ScrollArea>
    );
};
