import { Router } from "express";
import { createUser, getAllUsers, getUserForId, updateDataUser } from "../controllers";
import { check } from "express-validator";
import { validar_campos, validate_jwt } from "../middlewares";
import { findEmail, findId } from "../helpers";


const router = Router();


router.get('/get-users',[
    // validate_jwt,
    validar_campos
], getAllUsers )

router.get('/get-user/:id', getUserForId)

router.post('/create-user',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Is not email').isEmail(),
    check('username', 'The username is required').not().isEmpty(),
    check('password', 'The min of the password is 8 letters or numbers').isLength({min: 8}),
    validar_campos
], createUser)

router.put('/update-user/:id',[
    check('id').custom(findId),
    check('email').custom( findEmail ),
    validar_campos
], updateDataUser)

export default router;