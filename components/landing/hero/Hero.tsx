'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';

interface Props {
    isSignIn : boolean
}

const Hero = ({isSignIn} : Props) => {
    return (
        <div className="py-8 flex items-center justify-center" >
            <div className="flex flex-col items-center justify-center gap-2" >
                <div className="text-xl flex flex-col items-center justify-center gap-1 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold">
                    <h1>The Best AI tool for</h1>
                    <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                        <Typewriter 
                            options={
                                {
                                    strings:["Chatbot.","Photo Generation.","Blog Writing.","Mail Writing."],
                                    autoStart:true,
                                    loop:true
                                }
                            }
                            
                        />
                    </div>
                </div>
                <p className='text-zinc-500' >Create content using AI 10x faster</p>
                <Link href={isSignIn ? "/dashboard" : "/sign-in"}>
                    <Button variant="premium" >Start Generating for free</Button>
                </Link>
                <p className='text-zinc-500'>No credit card required</p>

            </div>

        </div>
    )
}

export default Hero