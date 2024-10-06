import { Sidebar } from '@/components/layout/sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className={'flex w-screen h-screen overflow-hidden bg-black'}>
            <Sidebar />
            {children}
        </section>
    );
}
