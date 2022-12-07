import { Router } from "express";
import { buy_product, get_products_shopping, get_product_shopping_id } from "../controllers";
import { is_user_role, validar_campos, validate_jwt } from "../middlewares";


const router = Router();


router.get('/get-products-shopping',[
    validate_jwt,
    is_user_role,
    validar_campos
], get_products_shopping)

router.get('/get_product_shopping_id/:id', [
    validate_jwt,
    is_user_role,
    validar_campos
], get_product_shopping_id)

router.post('/buy-product',[
    validate_jwt,
    is_user_role,
    validar_campos
], buy_product)



export default router;