'use client'
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({params:{id}}:{params:{id:string}}) => {
  const {user,isLoaded}=useUser();
  const [isSetupComplete, setIsSetupComplete] = useState<Boolean>(false)
  const {call,isCallLoading}=useGetCallById(id);
  if(!isLoaded || isCallLoading){
    return(<Loader/>)
  }
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {isSetupComplete?(<MeetingRoom/>):(<MeetingSetup setIsSetupComplete={setIsSetupComplete}/>)}
      </StreamTheme>
    </StreamCall>
  )
}

export default Meeting