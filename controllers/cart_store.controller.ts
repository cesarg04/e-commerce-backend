import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { RequestCustom } from "../interfaces/user_request";
import { Cart } from "../interfaces/cart";

const prisma = new PrismaClient();

export const add_cart = async( req: RequestCustom, res: Response ) => {

    const { id } = req.user;
    const { product } = req.body

    try {
        
        const cart = await prisma.cart.create({
            data: {
                userId: id,
                productId: product
            }
        })

        res.json({
            message: 'Add cart success',
            cart
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Add cart not work, try again'
        })

    }   

}


export const get_cart_user = async( req: RequestCustom, res: Response ) => {

    const { id } = req.user;

    try {
        
        const cart = await prisma.cart.findMany({
            where: {
                userId: Number(id) 
            },
            include: {product: {
                select: {
                    id: true,
                    price: true,
                    image: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }}
        })

        if (!cart) return res.status(404).json({Message: 'No cart found'})

        res.json({cart})

    

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: 'Server error, please try again'})
    }

}