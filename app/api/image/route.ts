import { checkUserApiLimits, updateUserLimitsCount } from "@/actions/userApiLimits";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey :'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' 
})

const openai = new OpenAIApi(configuration)

export const POST = async (req : NextRequest) => {
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

        const {prompt,size,number} = await req.json()

        if(!prompt || !size || !number){
            return new NextResponse(JSON.stringify({message:"Missing informations!"}))
        }

        const response = await openai.createImage({
            prompt,
            size,
            n : parseInt(number,10)
        })

        if(!isPro){
            await updateUserLimitsCount()
        }

        return new NextResponse(JSON.stringify(response.data.data),{status:200})

    } catch (error : any) {
        console.log("[IMAGE_ERROR : ]",error)
        return new NextResponse(JSON.stringify({message:error.message}),{status:500})
    }
}