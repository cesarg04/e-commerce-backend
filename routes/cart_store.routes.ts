import { Router } from "express";
import { add_cart, get_cart_user } from "../controllers";
import { is_user_role, validar_campos, validate_jwt } from "../middlewares";

const router = Router();

router.post('/add-cart',[
    validate_jwt,
    is_user_role,
    validar_campos
],add_cart)


router.get('/get-cart', [
    validate_jwt,
    is_user_role,
    validar_campos
], get_cart_user)

export default router;