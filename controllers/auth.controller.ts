import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { Login } from "../interfaces/login";
import bcrypt from 'bcrypt'
import { exclude, generate_jwt } from "../helpers";


const prisma = new PrismaClient();

export const login = async(req: Request, res: Response) => {

    const body:Login = req.body;

    try {
        
        const user = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        })
    
        // Verify the password
        const verifyPassword = bcrypt.compareSync(body.password, user?.password || '');
    
        if (!verifyPassword) return res.status(400).json({message: 'The password is incorrect'});
    
        const token = await generate_jwt(user?.id.toString() || '')
    
        res.json({
            message: 'Login successfuly',
            token,
            user: exclude(user, [])
        })

    } catch (error) {
        
        res.status(500).json({message: 'Login error, please try again'})

    }


}