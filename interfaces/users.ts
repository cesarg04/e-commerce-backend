import { Role } from "@prisma/client"

export interface User {
    email: string
    name: string
    username: string
    password: string
    role?: Role

}


export interface Arrive {
    name: string;
    surname: string;
    phone_number: string;
    apt_or_suite: string | null;
    country: string;
    city: string;
    state: string;
    postal_code: string;
}

export interface userId{
    id: number
}