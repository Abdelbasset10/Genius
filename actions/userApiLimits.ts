import { MAX_USE_APLI } from "@/components/constants"
import { prismadb } from "@/utils/prisma"
import { auth } from "@clerk/nextjs"


export const updateUserLimitsCount = async () => {
    try {
        const {userId} = auth()
        
        if(!userId){
            return null
        }

        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where:{
                userId
            }
        })

        if(userApiLimit){
            const upgraded = await prismadb.userApiLimit.update({
                where:{
                    userId
                },
                data:{
                    count:userApiLimit.count + 1
                }
            })
            
            return upgraded
        }else{
            const upgraded = await prismadb.userApiLimit.create({
                data:{
                    userId,
                    count:0
                }
            })

            return upgraded
        }

    } catch (error) {
        console.log(error)
    }
}

export const checkUserApiLimits = async () => {
    try {
        const {userId} = auth()

        if(!userId){
            return null
        }

        const user = await prismadb.userApiLimit.findUnique({
            where:{
                userId
            }
        })

        if(!user){
            await prismadb.userApiLimit.create({
                data:{
                    userId,
                    count:0
                }
            })
            return true
        }

        if(user.count >= MAX_USE_APLI){
            return false
        }else{
            return true
        }

    } catch (error) {
        console.log(error)
    }
}

export const getCount = async () => {
    try {
        const {userId} = auth()

        if(!userId){
            return null
        }

        const user = await prismadb.userApiLimit.findUnique({
            where:{
                userId
            }
        })

        if(user){
            return user.count
        }else{
            return 0
        }

    } catch (error) {
        console.log(error)
    }
}
