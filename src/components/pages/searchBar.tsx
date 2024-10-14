import { Input } from '@/components/ui/input';
import { useGlobalStore } from '@/lib/hooks/useGlobalStore';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui';

export default function SearchBar() {
    const { searchValue, setSearchValue } = useGlobalStore();
    return (
        <header className={'relative w-full h-24 p-2 border-slate-900 border-b-[1px]'}>
            <Input
                className={'h-14 outline-none py-4 px-2 pl-6 border-none bg-white/5 text-sm placeholder:text-white/70'}
                placeholder={'Search passwords, websites,...'}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <Button variant={'default'} className={'absolute right-0 top-0 translate-y-1/2 -translate-x-1/2'}>
                <Search className={'size-5'} />
            </Button>
        </header>
    );
}
