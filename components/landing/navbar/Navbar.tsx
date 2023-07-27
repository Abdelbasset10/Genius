import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface Props {
    isSignIn : boolean
}

const Navbar = ({isSignIn} : Props) => {
  return (
    <nav className="py-2 px-4 flex items-center justify-between" >
        <div className="flex items-center gap-2" >
            <div className="w-8 h-8 relative" >
                <Image src="/logo.png" fill alt="logo img" />
            </div>
            <h2 className="font-bold text-xl text-white" >Genius</h2>
        </div>
        <Link href={isSignIn ? "/dashboard" : "/sign-in"} >
            <Button variant="outline" >Get started</Button>
        </Link>
    </nav>
  )
}

export default Navbar