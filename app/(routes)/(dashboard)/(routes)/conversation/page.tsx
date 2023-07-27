'use client'


import AvatarImg from "@/components/dashboard/layout/AvatarImg"
import Empty from "@/components/dashboard/layout/Empty"
import Loader from "@/components/dashboard/layout/Loader"
import { MessageSquare } from "lucide-react"

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
import { useAppDispatch } from "@/redux/hooks"
import { openProModal } from "@/redux/features/ModalSlice"

const formSchema = z.object({
  prompt: z.string().min(2,{
    message:"Prompt must contain at least 2 caracters"
  }),
})

const ConversationPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userMessage : ChatCompletionRequestMessage = {role:"user",content:values.prompt}
      const newMessages = [...messages,userMessage]
      const response = await fetch("/api/conversation",{
        method:"POST",
        body:JSON.stringify({messages:newMessages})
      })
      const data = await response.json()
      setMessages((prev)=>[...prev,userMessage,data])
      form.reset()
    } catch (error : any) {
      console.log(error)
        dispatch(openProModal()) 
    } finally{
      router.refresh()
    }
  }

  return (
    <div className="w-full py-4" >
      <div className="w-11/12 mx-auto" >
        <div className="flex items-center gap-2" >
          <div className="p-2 rounded-lg bg-violet-500/10" >
            <MessageSquare className="w-10 h-10 text-violet-500" />
          </div>
          <div className="flex flex-col" >
            <h1 className="text-2xl font-bold" >Conversation</h1>
            <p className="text-neutral-500" >Our mose advanced conversation model</p>
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
                <Input placeholder="How do i calculate the radius of circle?" disabled={isLoading} {...field} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mr-2 w-32 bg-violet-500 hover:bg-violet-400">Submit</Button>
      </form>
    </Form>
      {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          {isLoading && (
            <Loader />
          )}
          
          {messages.length >0 && !isLoading && (
            <div className="my-4 flex flex-col-reverse gap-4" >
              {messages.map((message,index)=>(
                <div key={index} className={cn("p-4  border-[1px] rounded-lg flex items-start gap-4",message.role === "assistant" && "bg-neutral-100")} >
                  <AvatarImg role={message.role} />
                  <p className="text-sm " >{message.content}</p>
                </div>
              ))}
          </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ConversationPage