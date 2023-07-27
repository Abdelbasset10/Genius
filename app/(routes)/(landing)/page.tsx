import Hero from "@/components/landing/hero/Hero"
import Navbar from "@/components/landing/navbar/Navbar"
import Testimonials from "@/components/landing/testimonials/Testimonials"
import { auth } from "@clerk/nextjs"



const HomePage = () => {
  const {userId} = auth()
  let isSignIn
  if(userId){
    isSignIn = true
  }else{
    isSignIn = false
  }

  return (
    <div>
      <Navbar isSignIn={isSignIn} />
      <Hero isSignIn={isSignIn} />
      <Testimonials />
    </div>
  )
}

export default HomePage