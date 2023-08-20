'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { tools } from "@/components/constants"
import { Card } from "@/components/ui/card"
import { Check, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { closeProModal } from "@/redux/features/ModalSlice"
import { useState } from "react"
import { useRouter } from "next/navigation"



const ProModal = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {proModal} = useAppSelector((state)=>state.modal)

    const [loading,setLoading] = useState(false)

    const handleClose = () => {
        dispatch(closeProModal())
    }

    const onSubscribe = async () => {
        try {
            setLoading(true);
                const res = await fetch("/api/stripe");
                const response = await res.json()
                window.location.href = response.url;
        } catch (error) {
        } finally {
          setLoading(false);
          router.refresh()
        }
      }

    return (
            <Dialog open={proModal} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogDescription className="flex items-center justify-center gap-x-2" >
                    <p className="font-bold text-black text-lg" >Upgrade to Genius</p>
                    <Badge variant="premium" className="py-1">PROss</Badge>    
                </DialogDescription>
                </DialogHeader>   
                <div className="mt-4 flex flex-col gap-3" > 
                    {tools.map((tool,index)=>(  
                        <Card key={index} className='flex items-center justify-between  p-2 cursor-pointer hover:shadow-md' >
                            <div className='flex items-center gap-2' >
                            <div className={cn("p-1 rounded-lg",tool.bgColor)} >
                                <tool.icon className={cn("w-6 h-6",tool.color)} />
                            </div>
                            <p className='font-semibild' >{tool.label}</p>
                            </div>
                            <Check className='w-6 h-6' />
                        </Card> 
                    ))}
                </div>
                <DialogFooter>
                <Button className="w-full" variant="premium" disabled={loading} onClick={onSubscribe} >Upgrade <Zap className="ml-2" /></Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )
}

export default ProModal