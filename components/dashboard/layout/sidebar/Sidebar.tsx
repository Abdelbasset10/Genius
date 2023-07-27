"use client"

import {usePathname} from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils';

import {routes } from '@/components/constants'
import { useEffect, useState } from 'react'

import Counter from './Counter'

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });


interface Props {
  counter : number | null | undefined
  isPro : boolean
}

const Sidebar = ({counter, isPro} : Props) => {
  const pathname = usePathname()

  const [isMounted,setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }
  
  
  return (
    <div className="w-full h-full bg-[#111827] text-white px-4 py-8" >
        <div className="flex flex-col gap-8" >
          <div className="flex items-center gap-3" >
            <div className='w-8 h-8 relative' > 
              <Image src="/logo.png" fill alt='logo img' />
            </div>
            <h2 className={cn("text-xl font-bold text-white",poppins.className)} >Genius</h2>
          </div>
          <div className='flex flex-col gap-4' >
            {routes.map((route,index)=>(
              <Link href={route.href} key={index} >
                <div className={cn('flex items-center gap-3 p-2 hover:bg-white/5 rounded-md text-zinc-500',route.href === pathname && "bg-white/10 text-white ")} >
                    <route.icon className={cn("w-6 h-6",route.color)} />
                    <p>{route.label}</p>
                </div>
              </Link>
            ))}
          </div>
          <Counter isPro={isPro} counter={counter} />
        </div>
    </div>
  )
}

export default Sidebar