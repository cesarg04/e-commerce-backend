import { Router } from "express";
import { createProdcutVendor, get_all_products, get_products_vendor } from "../controllers";
import { check_extension_files, validar_campos, validate_jwt } from "../middlewares";

const router = Router();


router.get('/get-products', [], get_all_products)

router.post('/create-product', [
    validate_jwt,
    validar_campos,
    check_extension_files
], createProdcutVendor)

router.get('/get-product-for-user', [
    validate_jwt,
    validar_campos
], get_products_vendor)

export default router;



