import { Router } from "express";
import { login } from "../controllers";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   
 */

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: login page - return the token and user information
 *    content:
 *     application/json:
 *      schema:
 *       type: array
 *                      
 */

router.post('/login', [], login)


export default router;

