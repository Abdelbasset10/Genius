'use client'

import { Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react"

interface Props {
    counter : number | null | undefined
    isPro : boolean
}

const MobileSidebar = ({counter,isPro} : Props) => {
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    
    return (
        <Sheet>
            <SheetTrigger>
                <div>
                    <Menu className="w-8 h-8" />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 overflow-y-auto bg-gray-900">
                <Sidebar isPro={isPro} counter={counter} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar