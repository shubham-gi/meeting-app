'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px] bg-black-2'>
            <Sheet >
                <SheetTrigger asChild>
                    <Image
                        src={'./icons/hamburger.svg'}
                        alt='mobileNav'
                        width={36}
                        height={36}
                        className='cursor-pointer sm:hidden '
                    />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-dark-1 text-white'>
                    <Link href={'/'} className='flex items-center gap-1'>
                        <Image src={'./icons/logo.svg'}
                            height={32}
                            width={32}
                            alt='logo'
                            className='max-sm:size-10'
                        />
                        <p className='text-[26px]  font-extrabold text-white'>
                            Meeting's App
                        </p>
                    </Link>
                    <div className='h-[calc(100vh-72px)] flex flex-col justify-between overflow-y-auto'>
                        <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {sidebarLinks.map((link) => {
                                const isActive = pathname === link.route || (link.route !== "/" && pathname.startsWith(link.route));
                                return (
                                    <SheetClose asChild key={link.route}>
                                        <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start max-w-60', { 'bg-blue-1': isActive })}>
                                            <Image
                                                src={link.imgUrl}
                                                alt={link.label}
                                                height={24}
                                                width={24}
                                            />
                                            <p className='font-semibold'>
                                                {link.label}
                                            </p>
                                        </Link>
                                    </SheetClose>
                                )
                            })}
                        </section>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav