import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now=new Date();

  const time=now.toLocaleTimeString('en-US',{hour:'numeric',minute:'numeric'});
  const date=(new Intl.DateTimeFormat('en-US',{dateStyle:'full'})).format(now);
  return (
    <section className='flex flex-col size-full text-white gap-10'>
      <div className='h-[300px] rounded-[20px] w-full bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'> 
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg text-sky-1'>
               {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home