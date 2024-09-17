import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'
import { ButtonIcon } from '@radix-ui/react-icons'

interface MeetingModalProps {
    title: string,
    isOpen: boolean,
    className?: string,
    buttonText?: string,
    onClose: () => void,
    handleClick?: () => void,
    children?: ReactNode,
    instantMeeting?: boolean;
    image?: string,
    buttonClassName?: string;
    buttonIcon?: string
}
const MeetingModal = ({ title,
    isOpen,
    className,
    buttonText,
    onClose,
    handleClick,
    image,
    children,
    buttonIcon
}: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className={cn('flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white', 'bg-dark-1')}>
                <div className='flex flex-col gap-6 '>
                    {image && (<div className='flex justify-center'>
                        <Image src={image} alt={image} width={72} height={72} />
                    </div>)}
                    <h1 className={cn('text-3xl font-bold leading-[42px] flex justify-center', className)}>{title}</h1>
                    {children}
                    <Button className={cn('bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0')} onClick={handleClick}>
                        {buttonIcon && (<Image src={buttonIcon} height={40} width={40} alt={buttonIcon} />)} &nbsp;
                        {buttonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )

}

export default MeetingModal