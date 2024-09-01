import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href={'/'} className='flex-between flex justify-between items-center gap-1'>
        <Image src={'./icons/logo.svg'}
          height={32}
          width={32}
          alt='logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] max-sm:hidden  font-extrabold text-white'>
          Meeting's App
        </p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Clerk User Management */}
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar