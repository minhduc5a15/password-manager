'use client';

import { Settings, Trash2, LayoutDashboard, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface NavItem extends React.HTMLAttributes<HTMLAnchorElement> {
    icon: React.JSX.Element;
    label: string;
    active?: boolean;
    className?: string;
}

const NavItem: React.FC<NavItem> = ({ icon, label, active = false, className = '', ...props }) => (
    <Link
        href={`/${label.toLowerCase()}`}
        {...props}
        className={`flex items-center py-2 px-4 rounded cursor-pointer ${active ? 'bg-white/20' : 'hover:bg-white/10'} ${className}`}
    >
        {icon}
        {label}
    </Link>
);

const UserProfile: React.FC = () => (
    <div className="flex items-center">
        <Image src="/avatar.jpg" width={40} height={40} className="rounded-full" alt="User avatar" />
        <div className="ml-3">
            <h2 className="font-semibold">Phạm Đức</h2>
            <span className="text-xs text-green-400">duck</span>
        </div>
    </div>
);

export const Sidebar: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleLogOut = async () => {
        setIsLoading(true);
        try {
            await axios.post('/api/auth/sign-out');
            router.refresh()
        } catch (error) {
            console.error('Failed to log out:', error);
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    return (
        <div className="w-64 p-4 relative">
            <UserProfile />
            <nav className="space-y-1 mt-8">
                <NavItem icon={<LayoutDashboard className="mr-3 h-4 w-4" />} label="Dashboard" active />
                <NavItem icon={<Settings className="mr-3 h-4 w-4" />} label="Settings" />
                <NavItem icon={<Trash2 className="mr-3 h-4 w-4" />} label="Trash" className="mt-auto" />
            </nav>
            <div className="absolute left-0 w-full p-4 bottom-0">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full h-14 mt-auto mb-4">
                            <LogOut className="mr-3 h-4 w-4" /> Log out
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-gray-100">
                                <LogOut className="h-5 w-5 text-gray-400" />
                                Confirm Log Out
                            </DialogTitle>
                            <DialogDescription className="text-base pt-2 text-gray-300">Are you sure you want to log out?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <Button type="button" variant="default" onClick={handleLogOut} className="bg-blue-600 text-white hover:bg-blue-700">
                                Log Out
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 hover:text-white"
                            >
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
