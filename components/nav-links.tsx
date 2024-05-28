"use client";

// Libraries
import { usePathname } from 'next/navigation'
import Link from 'next/link';

// UI Components
import { AudioLines, AudioWaveform, Replace } from 'lucide-react';
import { Button } from './ui/button';

// Add all nav links here:
const links = [
    { href: '/app', label: 'Report Stream', icon: AudioWaveform },
    { href: '/app2', label: 'Report Stream', icon: Replace },
]

export function NavLinks() {

    const pathname = usePathname()
    
    return (
        <nav className="justify-center grid space-y-2">

            {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                    <Button size="icon" variant={"ghost"} className={`${pathname === href ? 'bg-muted' : ''}`}>  
                        <Icon className='w-5 h-5' />
                    </Button>
                </Link>
            ))}
        </nav>
    )
}

export function NavLinksMobile() {

    const pathname = usePathname()

    return (
        <nav className="grid gap-2 text-lg font-medium">
            <Link href="#" className="flex items-center mb-4 text-lg font-semibold">
                <AudioLines className="h-6 w-6" />
                <span className="sr-only">FieldReport</span>
            </Link>

            {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === href ? 'text-primary bg-muted' : ''}`}>
                    <Icon className='w-6 h-6' />
                    <span>{label}</span>
                </Link>
            ))}
        </nav>
    )
}