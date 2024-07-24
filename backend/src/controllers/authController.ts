import { NextFunction, Request, Response } from "express";
import { pool } from "../config/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User, UserRow } from "../types";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get username and password request parameters
    const { username, password } = req.body;
    // 2. Validate username and password exists
    if (!username) return res.status(500).json({ message: 'username is required' })
    if (!password) return res.status(500).json({ message: 'password is required' })
    // 3. Search for user in db
    const query = `SELECT id_usuario, username, password, nombre, apellido, email FROM usuario WHERE username = ?`
    pool.execute(query, [username], async (err, result) => {
        if (err) throw err
        const users = result as UserRow[]
        const userFound = users[0]
        if (!userFound) return res.status(401).json({ message: "User or password is wrong, try again." })
        const passwordMatch: Boolean = await bcrypt.compare(password, userFound.password);
        if (!passwordMatch) return res.status(401).json({ message: "User or password is wrong, try again." })
        // 5. Generate JWT token and payload
        const payload: User = {
            "id": userFound.id,
            "username": userFound.username,
            "password": userFound.password,
            "first_name": userFound.first_name,
            "last_name": userFound.last_name,
            "email": userFound.email,
            "is_active": userFound.is_active,
            "created_at": userFound.created_at,
            "updated_at": userFound.updated_at
        };
        const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
        if (!accessTokenSecret) return res.status(500).json({ message: "missing JWT_ACCESS_TOKEN_SECRET in .env" })
        const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
        // 6. Return 200 with access token
        return res.status(200).json({ message: "Login successfully.", access_token: accessToken })

    })

}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get data in request body
    const { first_name, last_name, username, password, confirmPassword, email }: {first_name: string ,last_name:string, username: string, password: string, confirmPassword: string, email: string} = req.body;
    // 2. Validate data
    let missingField: string | null = null
    if (!first_name) missingField = 'first_name is required'
    if (!last_name) missingField = 'last_name is required'
    if (!username) missingField = 'username is required'
    if (!password) missingField = 'password is required'
    if (!confirmPassword) missingField = 'confirmPassword is required'
    if (!email || email.indexOf('@') == -1) missingField = 'email is not valid or required'
    if (missingField != null) return res.status(500).json({ message: `${missingField} is required` })
    if (password != confirmPassword) return res.status(500).json({ message: "Password confirmation doesn't match." })
    // 3. Connect to db
    const query = `CALL sp_insertar_usuario(?, ?, ?, ?, ?)`
    const hashedPassword = await bcrypt.hash(password, 10)
    pool.execute(query, [username, hashedPassword, first_name, last_name, email], (err, results) => {
        if (err) return res.status(500).json({ message: "Error occured during query.", error_code: err.code })
        return res.status(201).json({
            message: "User registered successfully",
            data: [{ username, email }]
        })
    })
}