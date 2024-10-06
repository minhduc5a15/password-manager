'use client';

import './globals.css';
import { AccountProvider } from '@/lib/providers/account-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from '@/lib/providers/global-provider';
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
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
                        <body>{children}</body>
                    </GlobalProvider>
                </AccountProvider>
            </QueryClientProvider>
        </html>
    );
}
