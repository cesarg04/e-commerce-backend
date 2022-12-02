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
        res.json({
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
            select: {product: true, user: true}
        })

        if (!cart) return res.status(404).json({Message: 'No cart found'})

        const cartuser:Cart [] = []

        cart.map((car) => {

            const product = {
                id: car.product.id,
                name: car.product.name,
                image: car.product.image,
                price: car.product.price,
                stock: car.product.stock
            }

            const user = {
                id: car.user.id,
                vendor: car.user.name,
                email: car.user.email,
                username: car.user.username
            }

            cartuser.push({product, user})

        })

        res.json({cartuser})

    

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: 'Server error, please try again'})
    }

}