'use client';

import { useGlobalStore, useAccountStore } from '@/lib/hooks';
import { AccountItem } from '@/components/pages/accountItem';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';

export const AccountHeader = () => {
    const { currentSelectedAccount, setCurrentSelectedAccount } = useGlobalStore();
    const { reload } = useAccountStore();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        if (!currentSelectedAccount) return;

        try {
            await axios.delete(`/api/accounts/${currentSelectedAccount['_id']}`);

            const res = await axios.get('/api/accounts');
            const updatedAccounts = res.data;

            reload(updatedAccounts);

            setOpen(false);
            setCurrentSelectedAccount(undefined);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className={'relative flex w-full h-24 p-2 border-slate-900 border-b-[1px]'}>
            {currentSelectedAccount && (
                <>
                    <AccountItem account={currentSelectedAccount} />
                    <div className={'w-auto h-full absolute right-0 top-0 flex items-center pr-3'}>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant={'destructive'} className={'bg-transparent'}>
                                    <Trash2 />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2 text-white">
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                        Confirm Deletion
                                    </DialogTitle>
                                    <DialogDescription className="text-base pt-2 text-gray-300">Do you want to delete this account?</DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start">
                                    <Button type="button" variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                                        Delete
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        className="bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600"
                                    >
                                        Cancel
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </>
            )}
        </header>
    );
};
