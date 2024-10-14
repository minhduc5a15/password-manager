'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Input, Label, Loading } from '@/components/ui';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthForms() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setIsPending(true);

            const response = await toast.promise(
                axios.post('/api/auth/sign-in', { username, password }, { withCredentials: true }),
                {
                    pending: 'Signing in...',
                    success: 'Signed in successfully!',
                    error: 'Username or password is incorrect',
                },
                {
                    position: 'top-center',
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                },
            );

            if (response.status === 200) {
                setTimeout(() => router.refresh(), 500);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#161b27]">
            <Card className="w-full max-w-md bg-[#1c212b] border-none shadow-2xl transition">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">{'Login'}</CardTitle>
                    <CardDescription className="text-gray-400">{'Enter your credentials to login'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-white">
                                Username
                            </Label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                required
                                className="bg-gray-800 text-white"
                                value={username}
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="loginPassword" className="text-white">
                                Password
                            </Label>
                            <Input
                                id="loginPassword"
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="bg-gray-800 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        className="w-full text-white bg-blue-700 hover:bg-blue-900"
                        onClick={handleLogin}
                        type="submit"
                        disabled={isPending}
                    >
                        {!isPending ? 'Login' : <Loading />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
