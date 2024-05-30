"use client";

// Libraries
import { usePathname } from 'next/navigation'
import Link from 'next/link';

// UI Components
import { AudioLines, AudioWaveform, Globe, ListTodo, Map, Replace } from 'lucide-react';
import { Button } from './ui/button';


// Add all nav links here:
const links = [
    { href: '/app', label: 'Report Stream', icon: AudioWaveform },
    { href: '/app/globe', label: 'Globe', icon: Globe },
    { href: '/app/tasks', label: 'Tasks', icon: ListTodo },
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
        <nav className="grid gap-2 text-lg font-raleway">
            <Link className='flex items-center font-raleway pb-5' href='/app'>
                <AudioLines className="h-5 w-auto" />
                <span className="pl-1">FieldReport</span>
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