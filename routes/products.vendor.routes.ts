import { Router } from "express";
import { createProdcutVendor, get_products_vendor } from "../controllers";
import { validar_campos, validate_jwt } from "../middlewares";

const router = Router();


router.get('/get-products', [], )

router.post('/create-product', [
    validate_jwt,
    validar_campos
], createProdcutVendor)

router.get('/get-product-for-user', [
    validate_jwt,
    validar_campos
], get_products_vendor)

export default router;



