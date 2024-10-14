import type { Account } from '@/lib/types';
import { useGlobalStore } from '@/lib/hooks';
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { v4 } from 'uuid';

export interface AccountItem extends React.HTMLAttributes<HTMLDivElement> {
    account: Account;
}

const highlightText = (text: string, searchValue: string) => {
    if (!searchValue) return text;

    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    return parts.map((part) =>
        part.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={v4()} className="bg-slate-400">
                {part}
            </span>
        ) : (
            part
        ),
    );
};

export const AccountItem: React.FC<AccountItem> = React.memo(({ account, className, ...props }) => {
    const { setCurrentSelectedAccount, imageHash, searchValue, currentSelectedAccount } = useGlobalStore();
    const { platform } = account;

    const handleClick = () => {
        if (currentSelectedAccount === account) {
            setCurrentSelectedAccount(undefined);
            return;
        }
        setCurrentSelectedAccount(account);
    };
    return (
        <div className={cn('flex h-20 items-center pl-5 border-r-0 border-l-0 border-black/30', className)} onClick={handleClick} {...props}>
            <div className={'size-16 grid place-items-center'}>
                <div className={'size-14 bg-black rounded-2xl grid place-items-center overflow-hidden'}>
                    {imageHash.has(platform) ? (
                        <Image src={imageHash.get(platform)!} width={40} height={40} alt={''} />
                    ) : (
                        <span className={'bg-slate-950 size-full grid place-items-center'}>{platform[0].toUpperCase()}</span>
                    )}
                </div>
            </div>
            <div className={'flex-1 h-full flex justify-center flex-col pl-2'}>
                <span className={'font-semibold text-md first-letter:uppercase tracking-wide'}>{highlightText(platform, searchValue)}</span>
                <span className={'text-xs opacity-85'}>{highlightText(account.email, searchValue)}</span>
                <span className={'text-xs opacity-85'}>{highlightText(account.username, searchValue)}</span>
            </div>
        </div>
    );
});

AccountItem.displayName = 'AccountItem';
