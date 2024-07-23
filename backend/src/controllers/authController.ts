import { NextFunction, Request, Response } from "express";
import { dbPoolConnection } from "../config/database";
import { FieldPacket, QueryError, QueryResult } from "mysql2";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get username and password request parameters
    const { username, password } = req.body;
    // 2. Validate username and password exists
    if (!username) return res.status(500).json({ message: 'username is required' })
    if (!password) return res.status(500).json({ message: 'password is required' })
    // 3. Connect to db
    dbPoolConnection.getConnection((err, connection) => {
        if (err) return res.status(500).json({ message: "Database connection failed." })
        // 4. Generate query
        const query = `SELECT username, password FROM usuario WHERE username = ${connection.escape(username)}`
        // 5. Execute query
        connection.query(query, async (err, result: Array<Record<string, string>>, fields) => {
            // 6. Validate query success
            if (err) return res.status(500).json({ message: "Error occured during query.", error_code: err.code })
            // 7. Validate user with that username exists
            const [dbUser] = result
            if (!dbUser) return res.status(401).json({ message: "User or password is wrong, try again." })
            const passwordMatch: Boolean = await bcrypt.compare(password, dbUser.password);
            // 8. Validate password matches
            if (!passwordMatch) return res.status(401).json({ message: "User or password is wrong, try again." })
            // 9. Generate JWT token
            const payload = {
                "name": "Cornelio del Rancho",
                "email": "cornelio.delrancho@davinci.edu.ar",
                "is_admin": true
            };
            const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
            if (!accessTokenSecret) return res.status(500).json({ message: "missing JWT_ACCESS_TOKEN_SECRET in .env" })
            const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
            // 10. Return JWT token with necessary user info in payload
            return res.status(200).json({ message: "Login successfully.", access_token: accessToken })
        })
    })
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get data in request body
    const { first_name, last_name, username, password, confirmPassword, email } = req.body;
    // 2. Validate data
    let missingField: string | null = null
    if (!first_name) missingField = 'first_name is required'
    if (!last_name) missingField = 'last_name is required'
    if (!username) missingField = 'username is required'
    if (!password) missingField = 'password is required'
    if (!confirmPassword) missingField = 'confirmPassword is required'
    if (!email) return missingField = 'email is required'
    if (missingField != null) return res.status(500).json({ message: `${missingField} is required` })
    // 3. Connect to db
    dbPoolConnection.getConnection(async (err, connection) => {
        if (err) return res.status(500).json({ message: "Database connection failed." })
        // 4. Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        // 4. Generate query
        const query = `CALL sp_insertar_usuario(${connection.escape(username)}, ${connection.escape(hashedPassword)}, ${connection.escape(first_name)}, ${connection.escape(last_name)}, ${connection.escape(email)})`
        // 5. Execute query
        connection.query(query, (err, result, fields) => {
            // 6. Validate err didn't occur
            if (err) return res.status(500).json({ message: "Error occured during query.", error_code: err.code })
            // 7. Return created user
            return res.status(201).json({
                message: "User registered successfully",
                data: [{ first_name, last_name, username, email }]
            })
        })
    })
}