import { checkUserApiLimits, updateUserLimitsCount } from "@/actions/userApiLimits";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string ,
  });


export const POST = async (req:NextRequest) => {
    try {
        const {userId} = auth()

        if(!userId){
            return new NextResponse(JSON.stringify({message:"UnAuthorized!"}),{status:401})
        }

        const checkApiLimit = await checkUserApiLimits()
        const isPro = await checkSubscription();

        if(!checkApiLimit && !isPro){
            return new NextResponse(JSON.stringify({message:"You have been use all free trials!"}),{status:403})
        }

        const {prompt} = await req.json()

        if(!prompt){
            return new NextResponse(JSON.stringify({message:"Propmts is required!"}))
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
            input: {
                prompt_a: prompt
            }
            }
        );

        if(!isPro){
            await updateUserLimitsCount()
        }
        
        return new NextResponse(JSON.stringify(response),{status:200})

    } catch (error : any) {
        console.log("[MUSIC_POST_ERROR] : ",error)
        return new NextResponse(JSON.stringify({message:error.message}))
    }
}