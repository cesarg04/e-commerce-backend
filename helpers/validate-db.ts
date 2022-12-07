import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export const findId = async( id: string ) => {

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    if(!user) throw new Error('User not found')

}

export const findEmail = async(email: string) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(user) throw new Error('The email is used')

} 


export const validate_username = async( username: string ) => {

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    }) 

    if (user) throw new Error('The user is used, try to other user')
}
