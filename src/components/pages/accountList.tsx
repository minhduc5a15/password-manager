import type { Account } from '@/lib/types';
import { ScrollArea } from '@/components/ui';
import { AccountItem } from '@/components/pages/accountItem';
import { v4 } from 'uuid';
import { ChevronRight } from 'lucide-react';
import { useGlobalStore } from '@/lib/providers/global-provider';

export const AccountList = ({ accounts }: { accounts: Account[] }) => {
    const { currentSelectedAccount } = useGlobalStore(state => state);

    return (
        <ScrollArea className={'flex flex-1 flex-col max-h-screen overflow-auto'}>
            {accounts.map((item) => (
                <div className={'w-auto h-auto relative'} key={v4()}>
                    <AccountItem
                        className={`border-2 cursor-pointer ${currentSelectedAccount === item && 'bg-white/10'} hover:bg-white/10 relative`}
                        account={item}
                    />
                    <span className={'absolute right-0 h-full w-10 top-0 flex justify-center items-center'}>
                    <ChevronRight className={'size-4'} />
                </span>
                </div>
            ))}
        </ScrollArea>
    );
};
