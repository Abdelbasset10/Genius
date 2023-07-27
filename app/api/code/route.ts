import { checkUserApiLimits, updateUserLimitsCount } from "@/actions/userApiLimits";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey :'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'
})

const openai = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
  };
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

        const {messages} = await req.json()

        if(!messages){
            return new NextResponse(JSON.stringify({message:"Propmts are required!"}))
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [instructionMessage,...messages]
        });

        if(!isPro){
            await updateUserLimitsCount()
        }

        return new NextResponse(JSON.stringify(response.data.choices[0].message),{status:200})

    } catch (error : any) {
        console.log("[CONVERSATION_POST_ERROR] : ",error)
        return new NextResponse(JSON.stringify({message:error.message}))
    }
}