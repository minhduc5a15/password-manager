import React from 'react';
import { Account, AccountInfo } from '@/lib/types';
import { Eye, Plus, Upload } from 'lucide-react';
import { AccountMoreDetails } from '@/components/pages/accountMoreDetails';
import { checkStrengthPassword } from '@/lib/utils';
import { useGlobalStore } from '@/lib/providers/global-provider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Input, Label, Button, CopyButton } from '@/components/ui';
import Image from 'next/image';

export interface AccountDetails extends React.HTMLAttributes<HTMLDivElement> {
    account: Account | AccountInfo;
}

export const AccountDetails: React.FC<AccountDetails> = ({ account }) => {
    const { username, email, password, platform } = account;
    const { currentSelectedAccount, imageHash } = useGlobalStore(state => state);
    const [showPassword, setShowPassword] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const strengthPassword = checkStrengthPassword(password);

    React.useEffect(() => {
        setShowPassword(false);
    }, [currentSelectedAccount]);

    const handleUploadClick = () => {
        console.log('hello world');
        fileInputRef.current?.click();
    };

    React.useEffect(() => {
        setShowPassword(false);
    }, [currentSelectedAccount]);

    return (
        <Card className="w-full bg-[#0a0c11] border-none text-gray-100 relative rounded-0">
            <CardHeader className="relative pb-0">
                <div className="flex justify-center mt-4">
                    <div className="w-16 h-16 group">
                        <div className={'relative w-full h-full rounded-full group-hover:bg-gray-500 overflow-hidden flex items-center justify-center'}>
                            {imageHash.has(platform) ? (
                                <Image src={imageHash.get(platform)!} width={40} height={40} alt={''} />
                            ) : (
                                <span className={'bg-slate-800 size-full grid place-items-center'}>{platform[0].toUpperCase()}</span>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 group-hover:opacity-100">
                                <Label htmlFor="avatar-upload">
                                    <Button size="icon" className="text-white" onClick={handleUploadClick}>
                                        <Upload className="h-6 w-6" />
                                        <span className="sr-only">Upload avatar</span>
                                    </Button>
                                </Label>
                                <Input
                                    id="avatar-upload"
                                    type="file"
                                    onChange={e => {
                                        const file = e.target.files?.[0];
                                        console.log(file);
                                    }}
                                    ref={fileInputRef}
                                    accept="image/png"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-center font-mono">{platform}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mt-6">
                <div>
                    <Label htmlFor="email" className="text-sm text-gray-400">
                        Email
                    </Label>
                    <div className="flex items-center">
                        <Input id="email" value={email} readOnly className="rounded-none text-gray-100 border-b-[1px] border-white/30 focus:outline-0" />
                        <CopyButton value={email} variant="ghost" size="icon" className="text-gray-400" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="username" className="text-sm text-gray-400">
                        Username
                    </Label>
                    <div className="flex items-center">
                        <Input id="username" value={username} readOnly className="rounded-none text-gray-100 border-b-[1px] border-white/30 focus:outline-0" />
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
                        <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <CopyButton value={password} variant="ghost" size="icon" className="text-gray-400" />
                    </div>
                    <p
                        className={`text-xs ${
                            strengthPassword === 'strong' ? 'text-green-500' : strengthPassword === 'medium' ? 'text-blue-500' : 'text-red-500'
                        } mt-1`}
                    >
                        {strengthPassword}
                    </p>
                </div>
                <AccountMoreDetails account={account} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button variant="secondary" className="w-full justify-start bg-blue-700 text-blue-100 hover:text-blue-300 hover:bg-gray-700">
                    <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
            </CardFooter>
        </Card>
    );
};
