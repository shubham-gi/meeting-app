'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
const MeetingTypeList = () => {
    const createMeeting=()=>{

    }
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isSchedueMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'undefined' >()
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