import { PrismaClient, Products } from "@prisma/client";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import { upload_image } from "../helpers/cloudinary";
import { req_files, Product, Data_image_cloud } from "../interfaces/prodcuts";
import { RequestCustom } from "../interfaces/user_request";


const prisma = new PrismaClient();

export const get_all_products = async (req: RequestCustom, res: Response) => {

    try {

        const products = await prisma.products.findMany()

        res.json(products)

    } catch (error) {
        return res.status(500).json(error)
    }




}

export const createProdcutVendor = async (req: RequestCustom, res: Response) => {

    const user = req.user;
    const body: Products = req.body;
    const { products } = req.files as req_files
    console.log(user.id)


    try {
        const product = await prisma.products.create({
            data: {
                name: body.name,
                price: body.price,
                stock: Number(body.stock),
                categoryId: 2,
                userId: Number(user.id)
            }
        })

        let images:Data_image_cloud[] = []

        products?.forEach(async (prod) => {
            console.log(prod)
            const result =  await upload_image(prod.tempFilePath, body.name)

            images.push({
                productId: product.id,
                public_id: result.public_id,
                secure_url: result.secure_url
            })
            // await prisma.imagesProducts.create({
            //     data:{
            //         productId: product.id,
            //         url: result.secure_url,
            //         public_id: result.public_id
            //     }
            // })
        })

        const prodcuct_user = await prisma.products.findUnique({
            where:{
                id: product.id
            },
            include: {
                images: true
            }
        })

        res.json(prodcuct_user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            meeesage: 'Error in the server, please try again'
        })
    }




}



export const get_products_vendor = async (req: RequestCustom, res: Response) => {

    const { id } = req.user
    console.log('hello')

    try {

        const product = await prisma.products.findMany({
            where: {
                userId: id
            },
            include:{
                images: true
            }
        })

        if (!product) return res.json('Not found');

        res.json({
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ Message: 'Server error' })

    }


}


export const upload_images_for_poroduct = async (req: Request, res: Response) => {

    const images = req.files;




}