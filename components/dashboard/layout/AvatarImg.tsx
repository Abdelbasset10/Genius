import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useUser } from "@clerk/nextjs"

interface Props {
    role:string
}

const AvatarImg = ({role} : Props) => {
    const {user} = useUser()
    return (
    <Avatar>
        <AvatarImage src={role === "user" ? user?.profileImageUrl : "/logo.png"} />
        <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
        </AvatarFallback>
    </Avatar>
    )
}

export default AvatarImg