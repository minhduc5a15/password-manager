'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftToLine } from 'lucide-react';
import { Button } from '@/components/ui';

const Page = () => {
    const router = useRouter();
    return (
        <section className="w-screen h-screen bg-[#f3f4f6] flex flex-col justify-center items-center font-poppins">
            <span className="text-black text-9xl font-bold">404</span>
            <span className="text-[#373737] mt-4 text-6xl font-bold">Not Found</span>
            <Button
                autoFocus
                className="group text-black text-xl mt-3 font-semibold w-64 h-20 bg-white border-black border-2 opacity-50 transition rounded-xl hover:opacity-100 hover:text-white"
                onClick={() => {
                    router.back();
                }}
            >
                <ArrowLeftToLine className="mr-3 size-5 stroke-black group-hover:stroke-white transition-colors" />
                Go back?
            </Button>
        </section>
    );
};

export default Page;
