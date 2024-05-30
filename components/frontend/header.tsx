"use client";
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { AudioLines, Menu, OctagonAlertIcon, X } from 'lucide-react'
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { ThemeToggle } from '../darkmode-toggle';

const navigation = [
    { name: 'Features', href: '/#features' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Use Cases', href: '/#use-cases' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50 bg-background font-raleway">
            <nav className="flex items-center justify-between p-3 py-6 lg:py-3 lg:px-8 border-b border-gray-500" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link className='flex items-center' href='/'>
                        <AudioLines className="h-5 w-auto" />
                        <span className="pl-1">FieldReport</span>
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-xs leading-6 text-gray-900 dark:text-gray-300">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end pr-2">
                    <ThemeToggle />
                    <div className='w-40'>

                    </div>
                </div>
            </nav>

            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50 font-raleway" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">FieldReport</span>
                            <AudioLines className="h-8 w-auto" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="flex flex-col space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-muted"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link href="/auth/signin">
                                    <Button className="flex items-center w-full">
                                        <span className="relative flex h-2 w-2 mr-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Login to FieldReport
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
