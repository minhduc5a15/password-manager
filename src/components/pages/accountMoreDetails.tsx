import { Account } from '@/lib/types';
import { v4 } from 'uuid';
import { ExternalLink } from 'lucide-react';
import { isValidURL } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { CopyButton, Label, Button, Input } from '@/components/ui';

export interface AccountMoreDetails {
    account: Account;
}

export const AccountMoreDetails: React.FC<AccountMoreDetails> = ({ account }) => {
    const { username, email, password, _id, platform, ...informations } = account;
    return (
        <>
            {Object.keys(informations).map(keyInfo => {
                return (
                    <div key={v4()}>
                        <Label htmlFor={keyInfo.toLowerCase()} className="text-sm text-gray-400">
                            {keyInfo}
                        </Label>
                        <div className="flex items-center">
                            <Input
                                id={keyInfo.toLowerCase()}
                                value={informations[keyInfo]}
                                readOnly
                                className="rounded-none text-gray-100 border-b-[1px] border-white/30 focus:outline-0"
                            />
                            <CopyButton
                                value={informations[keyInfo].toString()}
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-red-400"
                            />
                            {isValidURL(informations[keyInfo].toString()) && (
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                                    <Link href={informations[keyInfo].toString()} target="_blank">
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};
