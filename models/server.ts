import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import user_routes from '../routes/users.routes'
import auth_routes from '../routes/auth.routes'
import product_routes from '../routes/products.vendor.routes'
import cart_routes from '../routes/cart_store.routes'

class Server{

    private app: express.Application
    private port: string
    private paths = {
        users: '/api/users',
        auth: '/api/auth',
        products: '/api/products',
        cart: '/api/cart'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8081'
        this.dbConection()
        this.middelwares()
        this.routes()
    }

    async dbConection(){

        const prisma = new PrismaClient()

        try {
            await prisma.$connect()
            console.log('Database On')
        } catch (error: any) {
            throw new Error(error)
        }
    }

    middelwares(){
        //Cors
        this.app.use(cors())
        // Lectura del body
        this.app.use( express.json() )
    }

    routes(){
        this.app.use(this.paths.users, user_routes ),
        this.app.use( this.paths.auth, auth_routes ),
        this.app.use( this.paths.products, product_routes ),
        this.app.use( this.paths.cart, cart_routes )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`);
        })
    }

}

export default Server;