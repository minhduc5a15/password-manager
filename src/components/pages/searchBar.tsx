import { Input } from '@/components/ui/input';

export default function SearchBar() {
    return (
        <header className={'relative w-full h-24 p-2 border-slate-900 border-b-[1px]'}>
            <Input
                className={'h-14 outline-none py-4 px-2 pl-6 border-none bg-white/5 text-sm placeholder:text-white/70'}
                placeholder={'Search passwords, websites,...'}
            />
        </header>
    );
}
