import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

interface AvatarProps {
    src?: string;
    alt?: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ src, alt, fallback, size = 'md' }: AvatarProps) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
    };

    return (
        <AvatarPrimitive.Root className={`relative flex shrink-0 overflow-hidden rounded-full ${sizeClasses[size]}`}>
            <AvatarPrimitive.Image className="aspect-square h-full w-full" src={src} alt={alt} />
            <AvatarPrimitive.Fallback
                className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground"
                delayMs={600}
            >
                {fallback[0].toUpperCase()}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
}
