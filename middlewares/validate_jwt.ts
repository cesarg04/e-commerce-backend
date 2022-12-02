import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import Jwt, { decode } from "jsonwebtoken";
import { RequestCustom } from "../interfaces/user_request";

export const validate_jwt = async(req: RequestCustom, res: Response, next: NextFunction) => {

    const token = req.header('x-token') as string;

    if (!token) {
        res.status(401).json({
            message: 'Not has token in requet'
        })
    }

    // Comprobe if token is expired 

    try {
        const { exp } = decode(token) as {
            exp: number
        }
        if (exp < (new Date().getTime() + 1) / 1000) {
            return res.status(401).json({
                message: 'Token expired'
            })
        }
        
    } catch (error) {
        console.log(error)
    }

    
    try {
        
        const { uid } = Jwt.verify(token, process.env.SECRETORPRIVATEKEY as string) as { uid: string }

        const prisma = new PrismaClient()

        const user = await prisma.user.findUnique({
            where: {
                id: Number(uid)
            }
        })

        if (!user) {
            return res.status(401).json({
                messagr: 'Invalid token -  The user not exist in the database'
            })
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Invalid token'})
    }

}
