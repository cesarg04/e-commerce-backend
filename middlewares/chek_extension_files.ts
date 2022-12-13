import { NextFunction, Request, Response } from "express";
import { req_files } from "../interfaces/prodcuts";


export const check_extension_files = ( req: Request, res: Response, next: NextFunction ) => {

    const { products } = req.files as req_files;

    const valid_extensions = ['jpg', 'png', 'gif']

    products?.forEach(prod => {
        
        let parse =  prod.name.split('.');
        let extesion = parse[ parse.length - 1 ]

        // Validate the extension

        if (!valid_extensions.includes(extesion)) {
            return res.status(500).json({message: `The extension of file ${ extesion } is not valid`})
        }
    })

    next()

}