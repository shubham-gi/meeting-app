'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/hooks/use-toast'
const MeetingTypeList = () => {
    const {toast}=useToast()
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isSchedueMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'undefined' >();
    const client=useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime:new Date(),
        description:'',
        link:''
    })
    const {user}=useUser();
    const [callDetails, setCallDetails] = useState<Call>();

    const createMeeting=async()=>{
        if(!client || !user) return;
        try {
            if(!values.dateTime) {
                toast({title:"Please select a date and time"});
            }
            const id= crypto.randomUUID();
            const call=client.call('default',id);
            if(!call ) throw new Error('Failed to create meeting');
            const startsAt=values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description=values.description || "Instant Meeting";
            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description,
                    }
                }
            });
            setCallDetails(call);
            if(!values.description){
                router.push(`/meetings/${call.id}`)
            }
            toast({title:"Meeting Created"});
        } catch (error:any) {
            console.log(error.message)
            toast({title:"Failed to create meeting"})
        }
    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4' >
            <HomeCard title='New Meeting' desc='Setup a new recording' ImgSrc='/icons/add-meeting.svg' altText='add-meeting' className='bg-orange-1' handleClick={() => {
                setMeetingState('isInstantMeeting')
            }} />
            <HomeCard title='Join Meeting' desc='via invitation link' ImgSrc='/icons/join-meeting.svg' altText='join-meeting' className='bg-blue-1' handleClick={() => {
                setMeetingState('isJoiningMeeting')
            }} />
            <HomeCard title='Schedule Meeting' desc='Plan your meeting' ImgSrc='/icons/schedule.svg' altText='schedule-meeting' className='bg-purple-1' handleClick={() => {
                setMeetingState('isSchedueMeeting')
            }} />
            <HomeCard title='View Recordings' desc='Meeting recordings' ImgSrc='/icons/recordings.svg' altText='add-meeting' className='bg-yellow-1' handleClick={() => {
                router.push('/recordings')
            }} />
            <MeetingModal isOpen={meetingState==='isInstantMeeting'} onClose={()=>{setMeetingState(undefined)}} title={'Start an Instant Meeting'} className={''} buttonText={'Start Meeting'} handleClick={createMeeting}/>
        </section>
    )
}

export default MeetingTypeList