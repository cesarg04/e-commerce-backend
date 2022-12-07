import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RequestCustom } from "../interfaces";

const prisma = new PrismaClient();

export const get_categories = async(req: Request, res: Response) => {

    try {
        
        const categories = await prisma.category.findMany();

        res.json({
            categories
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }

}

export const add_category = async(req: RequestCustom, res: Response) => {

    const { category } = req.body;

    try {
        
        const category_create = await prisma.category.create({
            data: {
                name: category
            }
        })

        res.json({
            message: 'Category created successfully',
            category_create
        })

    } catch (error) {
        return res.status(500).json({error})
    }

}