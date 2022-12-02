import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { User } from "../interfaces/users";
import bcyptjs, { hash } from 'bcrypt'
import { exclude } from "../helpers";
import { RequestCustom } from "../interfaces/user_request";

const prisma = new PrismaClient();

export const getAllUsers = async(req: RequestCustom, res: Response) => {


    const users = await prisma.user.findMany({
        select: {
            name: true,
            email: true,
            username:true,
            role: true,   
        }
    })

    if (!users) return res.status(400).json({messaje: 'Not useres'})
    
    res.json({
        users
    })
}

export const createUser = async(req: Request, res: Response) => {

    const body:User = req.body;
    let password_parse: string = ''
    const email_find = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (email_find) return res.status(400).json('The email is exsist in database')

    const saltRounds: number = 10;
    const hashPassword = bcyptjs.hash(body.password, saltRounds, async(err, hash) => {
        if (err) return res.status(400).json('Error in password')
        password_parse = hash


        try {
            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    role: body.role,
                    password: password_parse,
                    username: body.username
                }
            })
    
            res.json({
                msg: 'Usuario creado satisfactoriamente',
                user: exclude(user, ['password'])
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: 'Error al crear el usuario', error})
        }

    } )


}

export const getUserForId = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where:{
            id: Number(id)
        }
    })

    if (!user) return res.status(400).json({msg: 'User not found'})

    const user_not_password = exclude(user, ['password'])


    res.json(user_not_password)

}

export const updateDataUser = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const body = req.body;

    try {

        const updateUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data:{
                ...body
            }
        }) 

        const user_not_password = exclude(updateUser, ['password'])

        res.json({
            message: 'Data updated successfuly',
            user_not_password
        })
        
    } catch (error) {
        
        res.status(400).json({
            message: 'An error in the update to user'
        })
    }

}


export const deleteUser = async(req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        const user_not_password = exclude(deleteUser, ['password'])

        res.json({
            message: 'User deleted sucsessfuly',
            user_not_password
        })
        
    } catch (error) {

        res.status(400).json({
            message: 'An error in the delete to user'
        })

    }


}

