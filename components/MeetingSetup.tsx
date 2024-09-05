'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:Boolean)=>void}) => {
    const [isMyCamToggledOn, setisMyCamToggledOn] = useState(false);
    const call = useCall();
    if(!call){
        throw new Error('useCall must be within StreamCall Component')
    }
    useEffect(() => {
        if (isMyCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        }
        else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMyCamToggledOn, call?.camera, call?.microphone])
    return (
        <div className="flex h-screen w-full flex-col justify-center items-center text-white">
            <h1 className='text-2xl font-bold'>
                Setup
            </h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label htmlFor="" className='flex items-center justify-center gap-2 font-medium'>
                    <input type="checkbox" checked={isMyCamToggledOn} onChange={(e)=>{
                        setisMyCamToggledOn(e.target.checked)
                    }}/>
                    Join with mic and camera Off
                </label>
                <DeviceSettings />
            </div>
            <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={()=>{
                call.join();
                setIsSetupComplete(true)
            }}>
                    Join Meeting
            </Button>

        </div>
    )
}

export default MeetingSetup