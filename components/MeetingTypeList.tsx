'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/hooks/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'
const MeetingTypeList = () => {
    const { toast } = useToast()
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'undefined'>();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const { user } = useUser();
    const [callDetails, setCallDetails] = useState<Call>();
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${callDetails?.id}`;
    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast({ title: "Please select a date and time" });
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create meeting');
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            });
            setCallDetails(call);
            if (!values.description) {
                router.push(`/meetings/${call.id}`)
            }
            toast({ title: "Meeting Created" });
        } catch (error: any) {
            console.log(error.message)
            toast({ title: "Failed to create meeting" })
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
                setMeetingState('isScheduleMeeting')
            }} />
            <HomeCard title='View Recordings' desc='Meeting recordings' ImgSrc='/icons/recordings.svg' altText='add-meeting' className='bg-yellow-1' handleClick={() => {
                router.push('/recordings')
            }} />
            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                    buttonText='Create Meeting'
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Add a description
                        </label>
                        <Textarea
                            className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) =>
                                setValues({ ...values, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date: any) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-2 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Link Copied' });
                    }}
                    image={'/icons/checked.svg'}
                    buttonIcon="/icons/copy.svg"
                    className="text-center"
                    buttonText="Copy Meeting Link"
                />
            )}
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Meeting link"
                    onChange={(e:any) => setValues({ ...values, link: e.target.value })}
                    className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </MeetingModal>
            <MeetingModal isOpen={meetingState === 'isInstantMeeting'} onClose={() => { setMeetingState(undefined) }} title={'Start an Instant Meeting'} className={''} buttonText={'Start Meeting'} handleClick={createMeeting} />
        </section>
    )
}

export default MeetingTypeList