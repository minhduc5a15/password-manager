import { Lock, Settings, Trash2, User, LayoutDashboard } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const NavItem = ({
    icon,
    label,
    active = false,
    className = '',
}: {
    icon: React.JSX.Element;
    label: string;
    active?: boolean;
    className?: string;
}) => (
    <a
        href="#"
        className={`flex items-center py-2 px-4 rounded ${active ? 'bg-white/20' : 'hover:bg-white/10'} ${className}`}
    >
        {icon}
        {label}
    </a>
);

const UserProfile = () => (
    <div className="flex items-center">
        <Image src="/avatar.jpg" width={40} height={40} className="rounded-full" alt="User avatar" />
        <div className="ml-3">
            <h2 className="font-semibold">Phạm Đức</h2>
            <span className="text-xs text-green-400">duck</span>
        </div>
    </div>
);

export const Sidebar = () => (
    <div className="w-64 p-4">
        <UserProfile />
        <nav className="space-y-1 mt-8">
            <NavItem icon={<LayoutDashboard className="mr-3 h-4 w-4" />} label="Dashboard" active />
            <NavItem icon={<User className="mr-3 h-4 w-4" />} label="Account" />
            <NavItem icon={<Settings className="mr-3 h-4 w-4" />} label="Settings" />
            <NavItem icon={<Trash2 className="mr-3 h-4 w-4" />} label="Trash" className="mt-auto" />
        </nav>
    </div>
);
