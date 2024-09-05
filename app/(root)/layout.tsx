import StreamClientProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { Children, ReactNode } from 'react'
export const metadata: Metadata = {
  title: "Meeting App",
  description: "By Shubham Joshi using NextJs and getStream",
  icons:{
    icon:"/icons/logo.svg"
  }
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>
        {children}
      </StreamClientProvider>
    </main>
  )
}

export default RootLayout