import { Router } from "express";
import { add_arrived, createUser, delete_arrived, getAllUsers, getUserForId, get_arrived, updateDataUser } from "../controllers";
import { check } from "express-validator";
import { is_user_role, validar_campos, validate_jwt } from "../middlewares";
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


router.get('/get_arrived', [
    validate_jwt,
    is_user_role,
    validar_campos
], get_arrived)

router.post('/create_arrive',[
    validate_jwt,
    is_user_role,
    check('name', 'The name is required').not().isEmpty(),
    check('surname', 'The surname is required').not().isEmpty(),
    check('address', 'The addres is required').not().isEmpty(),
    check('country', 'The country is required').not().isEmpty(),
    check('city', 'The city is required').not().isEmpty(),
    check('state', 'The state is required').not().isEmpty(),
    check('postal_code', 'The postal_code is required').not().isEmpty(),
    validar_campos
], add_arrived)

router.put('/update_arrived/:id', [
    validate_jwt,
    is_user_role,
    validar_campos
])


router.delete('/delete_arrived',[
    validate_jwt,
    is_user_role,
    validar_campos
], delete_arrived)

export default router;