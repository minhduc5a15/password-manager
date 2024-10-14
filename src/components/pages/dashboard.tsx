'use client';

import SearchBar from '@/components/pages/searchBar';
import { Plus } from 'lucide-react';
import { useAccount, useAccountStore, useGlobalStore } from '@/lib/hooks';
import { AccountList } from '@/components/pages/accountList';
import { AccountDetails } from '@/components/pages/accountDetails';
import { ScrollArea, Button, Loading } from '@/components/ui';
import React from 'react';
import { AddNewAccountDiaLog } from '@/components/pages/addNewAccountDiaLog';
import { AccountHeader } from '@/components/pages/accountHeader';

export function Dashboard() {
    const { accountList: data } = useAccountStore();
    const { currentSelectedAccount } = useGlobalStore();
    const { isPending } = useAccount();
    const [isOpen, setIsOpen] = React.useState(false);
    if (!data) {
        return null;
    }
    return (
        <>
            <div className={'flex-1 flex relative'}>
                <div className={`${currentSelectedAccount ? 'w-1/2' : 'w-full'} transition duration-700 h-full flex flex-col bg-[#08090e] relative`}>
                    {isPending ? (
                        <Loading isFullScreen />
                    ) : (
                        <>
                            <SearchBar />
                            <AccountList accounts={data} />
                            <Button onClick={() => setIsOpen(!isOpen)} variant={'default'} className={'rounded-full size-12 absolute bottom-10 right-10'}>
                                <Plus className={'size-10'} />
                            </Button>
                        </>
                    )}
                </div>
                <div className={`flex-1 bg-[#0a0c11] flex-col ${currentSelectedAccount ? 'flex' : 'hidden'}`}>
                    <AccountHeader />
                    <ScrollArea>{currentSelectedAccount && <AccountDetails account={currentSelectedAccount!} />}</ScrollArea>
                </div>
            </div>
            <AddNewAccountDiaLog
                isOpen={isOpen}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            />
        </>
    );
}
