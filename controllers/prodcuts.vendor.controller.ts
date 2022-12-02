import { PrismaClient, Products } from "@prisma/client";
import { Request, Response } from "express";
import { RequestCustom } from "../interfaces/user_request";


const prisma = new PrismaClient();

export const getProductsVendor = async( req: RequestCustom, res: Response ) => {

    const user = req.user;




}

export const createProdcutVendor = async(req: RequestCustom, res: Response) => {

    const user = req.user;
    const body:Products = req.body;


    try {
        const product = await prisma.products.create({
            data:{
                name: body.name,
                price: body.price,
                image: body.image,
                stock: body.stock,
                userId: Number(user.id)
            }
        })
    
        res.json({
            product
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            meeesage: 'Error in the server, please try again'
        })
    }


}



export const get_products_vendor = async(req: RequestCustom, res: Response) => {

    const { id } = req.user
    console.log('hello')

    try {
        
        const product = await prisma.products.findMany({
            where: {
                userId: id
            }
        })

        if (!product) return res.json('Not found');

        res.json({
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({Message: 'Server error'})

    }   


}