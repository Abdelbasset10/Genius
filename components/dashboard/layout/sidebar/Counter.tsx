'use client'

import { MAX_USE_APLI } from "@/components/constants"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { openProModal } from "@/redux/features/ModalSlice"
import { useAppDispatch } from "@/redux/hooks"

import { Zap } from "lucide-react"
import { useEffect, useState } from "react"

interface Props {
    counter : number | null | undefined
    isPro:boolean
}

const Counter = ({counter,isPro} : Props) => {
    const dispatch = useAppDispatch()
    const [isMounted,setIsMounted] = useState(false)

    const handleOpenProModal = () => {
        dispatch(openProModal())
    }

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    if(isPro){
        return null
    }

    return (
        <div className='py-4 px-2 bg-white/10 rounded-lg mb-4 md:mb-0' >
            <div className='flex flex-col items-center gap-3' >
                <p >{counter}/{MAX_USE_APLI} Free Generations</p>
                <Progress value={counter as number * 100 / MAX_USE_APLI} className="border-none" />
                <Button variant="premium" className='w-full' onClick={handleOpenProModal}  >
                    Upgrade <Zap />
                </Button>
            </div>
        </div>
    )
}

export default Counter