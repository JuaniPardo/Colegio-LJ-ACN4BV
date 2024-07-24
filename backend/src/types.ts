import { RowDataPacket } from "mysql2"

export type User = {
    "id": number,
    "username": string,
    "password": string,
    "first_name": string,
    "last_name": string,
    "email": string,
    "is_active": string,
    "created_at": Date,
    "updated_at": Date
}

export interface UserRow extends RowDataPacket {
    "id": number,
    "username": string,
    "password": string,
    "first_name": string,
    "last_name": string,
    "email": string,
    "is_active": string,
    "created_at": Date,
    "updated_at": Date
}