import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RequestCustom } from "../interfaces";
import { buy_data } from "../interfaces/buy";


const prisma = new PrismaClient();


export const get_products_shopping = async(req: RequestCustom, res: Response) => {

    const { id } = req.user;

    try {
        const shopping = await prisma.stored.findMany({
            where: {
                userId: id
            },
            include: {product: {
                select:{
                    id: true,
                    name: true,
                    image: true, 
                    user: {
                        select: {id: true, name: true}
                    },
                    createdAt: true
                }
            }}
            
            
        })
        
        res.json({shopping})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

export const get_product_shopping_id = async( req: Request, res: Response ) => {

    const { id } = req.params
    
    try {
        
        const product = await prisma.stored.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(!product) return res.status(400).json({message: 'The product not exist'})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error, please try again'})
    }
    
}



export const buy_product = async(req: RequestCustom, res: Response) => {

    const { id } = req.user


    const body:buy_data = req.body;

    try {
        
        const buy = await prisma.stored.create({
            data:{
                userId: Number(id),
                productId: body.product_id, 
                amaunt: body.amount,
                status: 'PAID_OUT'
            }
        })

        res.json({
            message: 'Store pay completed',
            buy
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server error, please try again'})
    }
    

}