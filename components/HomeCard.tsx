import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
interface HomeCardProps {
    ImgSrc:string,
    altText:string,
    title:string,
    desc:string,
    className:string,
    handleClick:()=>void
};
const HomeCard = ({ ImgSrc, altText, title, desc,className,handleClick }: HomeCardProps) => {
    return (
        <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',className )} onClick={handleClick}>
            <div className='flex-center glassmorphism size-12 rounded-[12px]'>
                <Image src={ImgSrc} alt={altText} height={27} width={27} />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-extrabold'>{title}</h1>
                <p className=' text-lg font-normal'>{desc}</p>
            </div>
        </div>
    )
}

export default HomeCard