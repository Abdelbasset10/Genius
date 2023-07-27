'use client'


import AvatarImg from "@/components/dashboard/layout/AvatarImg"
import Empty from "@/components/dashboard/layout/Empty"
import Loader from "@/components/dashboard/layout/Loader"
import { Download, ImageIcon} from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Card, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { openProModal } from "@/redux/features/ModalSlice"
import { useAppDispatch } from "@/redux/hooks"

const formSchema = z.object({
  prompt: z.string().min(2,{
    message:"Image prompt must contain at least 2 caracters"
  }),
  number:z.string().min(1,{
    message:"Number of images is required"
  }),
  size:z.string().min(1,{
    message:"Number of images is required"
  }),
})

const ConversationPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      number:"1",
      size:"256x256"
    },
  })
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/image',{
        method:"POST",
        body:JSON.stringify(values)
      })
      const data = await response.json()
      const urls = data.map((img : any)=>img.url)
      setImages(urls)
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
          <div className="p-2 rounded-lg bg-pink-700/10" >
            <ImageIcon className="w-10 h-10 text-pink-700" />
          </div>
          <div className="flex flex-col" >
            <h1 className="text-2xl font-bold" >Image Generation</h1>
            <p className="text-neutral-500" >Our mose advanced conversation model</p>
          </div>
        </div>
        <div className="my-4" >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border-[1px] flex flex-col lg:flex-row gap-4 p-2">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1" >
                  <FormControl>
                    <Input placeholder="generate me images of Naruto" disabled={isLoading} {...field} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap items-center gap-4" >
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the number of images" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 image</SelectItem>
                  <SelectItem value="2">2 images</SelectItem>
                  <SelectItem value="3">3 images</SelectItem>
                  <SelectItem value="4">4 images</SelectItem>
                  <SelectItem value="5">5 images</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the size of images" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="256x256">256x256</SelectItem>
                  <SelectItem value="512x512">512x512</SelectItem>
                  <SelectItem value="1024x1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit" disabled={isLoading} className="mr-2 w-32 bg-violet-500 hover:bg-violet-400">Submit</Button>
            </div>
          </form>
        </Form>
      {images.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          {isLoading && (
            <Loader />
          )}
          
          {images.length >0 && !isLoading && (
            <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" >
              {images.map((image,index)=>(
                <Card>
                    <div key={index} className="w-full border-[1px] p-2 rounded-lg relative h-60" >
                      <Image src={image} fill alt="result img" />
                    </div>
                    <CardFooter>
                    <Button className="w-full mt-2" onClick={()=>window.open(image)} >
                      <Download className="w-4 h-4" />
                      download
                    </Button>
                    </CardFooter>
                </Card>
              ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConversationPage