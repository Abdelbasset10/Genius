'use client'

import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

import {
  Card,
} from "@/components/ui/card"
import { tools } from '@/components/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



const DashboardPage = () => {
  const [isMounted,setIsMounted] = useState(false)
  
  const router = useRouter()

  const handleRoute = (url : string) => {
    router.push(url)
  }

  useEffect(()=>{
    setIsMounted(true)
  },[])
  if(!isMounted){
    return null
  }

  return (
    <div className="w-full pt-4" >
      <div className="w-10/12 mx-auto pb-4" >
        <div className="flex flex-col gap-2 items-center justify-center" >
          <h1 className="text-2xl font-bold" >Explore the power of AI</h1>
          <p className="text-neutral-500" >Chat with the smartest AI - Explore the power of AI</p>
        </div>
        <div className="mt-4 flex flex-col gap-3" > 
        {tools.map((tool,index)=>(  
            <Card key={index} className='flex items-center justify-between mt-4 p-3 cursor-pointer hover:shadow-md' onClick={()=>handleRoute(tool.href)} >
                <div className='flex items-center gap-2' >
                  <div className={cn("p-1 rounded-lg",tool.bgColor)} >
                    <tool.icon className={cn("w-8 h-8",tool.color)} />
                  </div>
                  <p className='font-semibild' >{tool.label}</p>
                </div>
                <ArrowRight className='w-8 h-8' />
            </Card> 
        ))}


        </div>

      </div>

    </div>
  )
}

export default DashboardPage