'use client';

import SearchBar from '@/components/pages/searchBar';
import { Plus } from 'lucide-react';
import { useAccountStore } from '@/lib/providers/account-provider';
import { useGlobalStore } from '@/lib/providers/global-provider';
import { AccountItem } from '@/components/pages/accountItem';
import { AccountList } from '@/components/pages/accountList';
import { AccountDetails } from '@/components/pages/accountDetails';
import { ScrollArea, Button } from '@/components/ui';

export function Dashboard() {
    const { accountList: data } = useAccountStore(state => state);
    const { currentSelectedAccount } = useGlobalStore(state => state);

    if (!data) {
        return null;
    }
    return (
        <div className={'flex-1 flex relative'}>
            <div className={'w-1/2 h-full flex flex-col bg-[#08090e] relative'}>
                <SearchBar />
                <AccountList accounts={data} />
                <Button className={'rounded-full size-10 absolute bottom-10 right-10'}>
                    <Plus className={'size-10'} />
                </Button>
            </div>
            <div className={'flex-1 bg-[#0a0c11] flex flex-col'}>
                <header className={'relative w-full h-24 p-2 border-slate-900 border-b-[1px]'}>
                    {currentSelectedAccount && <AccountItem account={currentSelectedAccount} />}
                </header>
                <ScrollArea>
                    {currentSelectedAccount && <AccountDetails account={currentSelectedAccount!} />}
                </ScrollArea>
            </div>
        </div>
    );
}
