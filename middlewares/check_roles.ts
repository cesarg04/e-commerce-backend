import { NextFunction, Response } from "express";
import { RequestCustom } from "../interfaces/user_request";


export const is_superadmin_role = (req: RequestCustom, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user.role != 'SUPERADMIN') return res.status(401).json({message: 'The user is not superadmin'})

    next()

}

export const is_admin_role = ( req: RequestCustom, res: Response, next: NextFunction ) => {

    const user = req.user;

    if(user.role != 'ADMIN') return res.status(401).json({message: 'The user is not vendor'})

    next()

}

export const is_user_role = ( req: RequestCustom, res: Response, next: NextFunction ) => {

    const user = req.user;

    if (user.role != 'USER') return res.status(401).json({message: 'The user are not user'}) 

    next()
}

