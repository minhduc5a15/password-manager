import { Loader2 } from 'lucide-react';

interface LoadingProps {
    isFullScreen?: boolean;
}

export function Loading({ isFullScreen = false }: LoadingProps = {}) {
    const containerClasses = isFullScreen ? 'fixed inset-0 bg-background/70 backdrop-blur-sm' : 'relative w-full h-full min-h-[100px]';

    return (
        <div className={`${containerClasses} flex items-center justify-center`}>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}
