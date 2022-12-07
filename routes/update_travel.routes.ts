import { Router } from "express";
import { update_status_product } from "../controllers/update_travel.controller";
import { is_admin_role, validar_campos, validate_jwt } from "../middlewares";


const router =  Router();

router.put('/update_status_product/:id', [
    validate_jwt,
    is_admin_role,
    validar_campos
], update_status_product)

export default router;

