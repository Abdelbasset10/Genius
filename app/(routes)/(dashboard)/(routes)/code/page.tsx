'use client'


import ReactMarkdown from "react-markdown";
import Empty from "@/components/dashboard/layout/Empty"
import Loader from "@/components/dashboard/layout/Loader"
import { Code } from "lucide-react"

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
import { useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { openProModal } from "@/redux/features/ModalSlice";

const formSchema = z.object({
  prompt: z.string().min(2,{
    message:"Prompt must contain at least 2 caracters"
  }),
})

const CodePage = () => {
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
      const response = await fetch("/api/code",{
        method:"POST",
        body:JSON.stringify({messages:newMessages})
      })
      const data = await response.json()
      setMessages((prev)=>[...prev,userMessage,data])
      form.reset()
    } catch (error) {
      dispatch(openProModal()) 
    }finally{
      router.refresh()
    }
  }

  return (
    <div className="w-full py-4" >
      <div className="w-11/12 mx-auto" >
        <div className="flex items-center gap-2" >
          <div className="p-2 rounded-lg bg-green-700/10" >
            <Code className="w-10 h-10 text-green-700" />
          </div>
          <div className="flex flex-col" >
            <h1 className="text-2xl font-bold" >Code Generation</h1>
            <p className="text-neutral-500" >Generate code using description text</p>
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
                <Input placeholder="How to add Redux into Nextjs?" {...field} disabled={isLoading} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mr-2 w-32 bg-violet-500 hover:bg-violet-400">Submit</Button>
      </form>
    </Form>
      {messages.length === 0 && !isLoading && (
            <Empty label="No code generated." />
          )}
          {isLoading && (
            <Loader />
          )}
          
          {messages.length >0 && !isLoading && (
            <div className="my-4 flex flex-col-reverse gap-4" >
              {messages.map((message,index)=>(
                  <ReactMarkdown components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                      )
                    }} className="text-sm overflow-hidden leading-7">
                    {message.content || ""}
                  </ReactMarkdown>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default CodePage