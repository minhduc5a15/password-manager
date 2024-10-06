import React, { useEffect } from 'react';
import { Account } from '@/lib/types';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { AccountMoreDetails } from '@/components/pages/accountMoreDetails';
import { checkStrengthPassword } from '@/lib/utils';
import { useGlobalStore } from '@/lib/providers/global-provider';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Button,
    CopyButton,
} from '@/components/ui';
import Image from 'next/image';

export interface AccountDetails extends React.HTMLAttributes<HTMLDivElement> {
    account: Account;
}

export const AccountDetails: React.FC<AccountDetails> = ({ account }) => {
    const { username, email, password, platform } = account;
    const { currentSelectedAccount, imageHash } = useGlobalStore(state => state);
    const [showPassword, setShowPassword] = React.useState(false);

    const strengthPassword = checkStrengthPassword(password);

    useEffect(() => {
        setShowPassword(false);
    }, [currentSelectedAccount]);

    return (
        <Card className="w-full bg-[#0a0c11] border-none text-gray-100 relative rounded-0">
            <CardHeader className="relative pb-0">
                <CardTitle className="text-2xl font-semibold text-center">{platform}</CardTitle>
                <div className="flex justify-center mt-4">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                        {/*<GitHubLogoIcon className="w-10 h-10 text-white" />*/}
                        {imageHash.has(platform) ?
                        <Image src={imageHash.get(platform)!} width={40} height={40} alt={''} /> :
                        <span
                            className={'bg-slate-950 size-full grid place-items-center'}>{platform[0].toUpperCase()}</span>}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 mt-6">
                <div>
                    <Label htmlFor="email" className="text-sm text-gray-400">
                        Email
                    </Label>
                    <div className="flex items-center">
                        <Input
                            id="email"
                            value={email}
                            readOnly
                            className="rounded-none text-gray-100 border-b-[1px] border-white/30 focus:outline-0"
                        />
                        <CopyButton value={email} variant="ghost" size="icon" className="text-gray-400" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="username" className="text-sm text-gray-400">
                        Username
                    </Label>
                    <div className="flex items-center">
                        <Input
                            id="username"
                            value={username}
                            readOnly
                            className="rounded-none text-gray-100 border-b-[1px] border-white/30 focus:outline-0"
                        />
                        <CopyButton value={username} variant="ghost" size="icon" className="text-gray-400" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="password" className="text-sm text-gray-400">
                        Password
                    </Label>
                    <div className="flex items-center">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            readOnly
                            className="rounded-none text-gray-100 border-b-[1px] border-white/30 focus:outline-0"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                        <CopyButton value={password} variant="ghost" size="icon" className="text-gray-400" />
                    </div>
                    <p
                        className={`text-xs ${
                            strengthPassword === 'strong'
                                ? 'text-green-500'
                                : strengthPassword === 'medium'
                                ? 'text-blue-500'
                                : 'text-red-500'
                        } mt-1`}
                    >
                        {strengthPassword}
                    </p>
                </div>
                <AccountMoreDetails account={account} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button
                    variant="secondary"
                    className="w-full justify-start bg-blue-700 text-blue-100 hover:text-blue-300 hover:bg-gray-700"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
                <Button variant="destructive" className="w-full justify-start text-red-100 hover:text-red-300">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </CardFooter>
        </Card>
    );
};
