import { Router } from "express";
import { check } from "express-validator";
import { add_category, get_categories } from "../controllers";
import { is_superadmin_role, validar_campos, validate_jwt } from "../middlewares";


const router = Router()

router.get('/get_categories', [
    validate_jwt,
    validar_campos
], get_categories)

router.post('/add_category', [
    validate_jwt,
    is_superadmin_role,
    check('category', 'The category name is reqired').not().isEmpty(),
    validar_campos
], add_category)



export default router;