import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex justify-center w-full h-screen items-center'>
        <SignUp/>
    </main>
  )
}

export default SignInPage