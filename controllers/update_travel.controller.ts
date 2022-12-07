import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { RequestCustom } from "../interfaces";


const prisma = new PrismaClient()

export const update_status_product = async( req: RequestCustom, res: Response ) => {

    const { id } = req.params;
    const { status } = req.body
    console.log(status)

    try {
       
        const shop = await prisma.stored.update({
            where: {
                id: Number(id)
            },
            data:{
                status: status
            }
        })

        res.json({
            message: 'Product status updated',
            shop
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

export const cancel_order = async( req: RequestCustom, res: Response ) => {
    
    const { id } = req.params;
    try {
        
        const shop = await prisma.stored.update({
            where: {
                id: Number(id)
            },
            data: {
                status: 'CANCELLED'
            }
        })

        res.json({
            message: 'Order canceled successfully',
            shop
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }

}