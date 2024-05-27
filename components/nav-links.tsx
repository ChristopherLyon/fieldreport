"use client";

// Libraries
import { usePathname } from 'next/navigation'
import Link from 'next/link';

// UI Components
import { AudioLines } from 'lucide-react';

// Add all nav links here:
const links = [
    { href: '/app', label: 'Brain Stream', icon: AudioLines },
]

export function NavLinks() {

    const pathname = usePathname()
    
    return (
        <nav className="grid items-start px-2 lg:px-4 text-sm font-medium">
            {links.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === href ? 'text-primary bg-muted' : ''}`}>
                    <Icon className='w-4 h-4' />
                    <span>{label}</span>
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