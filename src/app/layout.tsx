'use client';

import './globals.css';
import 'aos/dist/aos.css';
import { AccountProvider } from '@/lib/providers/account-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from '@/lib/providers/global-provider';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: false,
        },
    },
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <AccountProvider>
                    <GlobalProvider>
                        <body>
                            {children}
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                closeOnClick
                                theme="dark"
                                transition={Bounce}
                                className={'text-sm'}
                            />
                        </body>
                    </GlobalProvider>
                </AccountProvider>
            </QueryClientProvider>
        </html>
    );
}
