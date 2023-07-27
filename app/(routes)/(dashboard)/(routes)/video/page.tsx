'use client'


import AvatarImg from "@/components/dashboard/layout/AvatarImg"
import Empty from "@/components/dashboard/layout/Empty"
import Loader from "@/components/dashboard/layout/Loader"
import { VideoIcon } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { openProModal } from "@/redux/features/ModalSlice"
import { useAppDispatch } from "@/redux/hooks"

const formSchema = z.object({
  prompt: z.string().min(2,{
    message:"Prompt must contain at least 2 caracters"
  }),
})

const Video = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [theVideo, setTheVideo] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/video",{
        method:"POST",
        body:JSON.stringify(values)
      })
      const data = await response.json()
      setTheVideo(data[0])
      form.reset()
    } catch (error) {
      dispatch(openProModal()) 
    } finally {
      router.refresh()
    }
    
  }


  return (
    <div className="w-full py-4" >
      <div className="w-11/12 mx-auto" >
        <div className="flex items-center gap-2" >
          <div className="p-2 rounded-lg bg-orange-700/10" >
            <VideoIcon className="w-10 h-10 text-orange-700" />
          </div>
          <div className="flex flex-col" >
            <h1 className="text-2xl font-bold" >Video Generation</h1>
            <p className="text-neutral-500" >Turn your prompt into video.</p>
          </div>
        </div>
        <div className="my-4" >
        <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border-[1px] flex p-2">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="flex-1" >
              <FormControl>
                <Input placeholder="sea waves" disabled={isLoading} {...field} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mr-2 w-32 bg-violet-500 hover:bg-violet-400">Submit</Button>
      </form>
    </Form>
      {!theVideo && !isLoading && (
            <Empty label="No conversation started." />
          )}
          {isLoading && (
            <Loader />
          )}
          
          {theVideo && !isLoading && (
            <div className="my-4 flex flex-col-reverse gap-4" >
                <video className="w-full" controls >
                  <source src={theVideo} />
                </video> 
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Video