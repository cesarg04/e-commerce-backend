import { Role } from "@prisma/client"

export interface User {
    email: string
    name: string
    username: string
    password: string
    role?: Role

}

