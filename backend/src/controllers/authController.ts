import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { RegisterCredentials, UserRepository } from "../repositories/UserRepository";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get username and password request parameters
    const { username, password } = req.body;
    // 2. Validate username and password exists
    if (!username) return res.status(500).json({ message: 'username is required' })
    if (!password) return res.status(500).json({ message: 'password is required' })
    // 3. Login with user credentials in db
    try {
      const user = await UserRepository.login({username, password})
      const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
      if (!accessTokenSecret) return res.status(500).json({ message: "missing JWT_ACCESS_TOKEN_SECRET in .env" })
      const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
      // 6. Return 200 with access token
      return res.status(200).json({ message: "Login successfully.", access_token: accessToken })

    } catch (err) {
      return res.status(400).json({ message: "Login failed, please verify your credentials." })
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get data in request body
    console.log(req.body)
    const { username, password, confirmPassword, nombre, apellido, email }: RegisterCredentials = req.body;
    // 2. Validate data
    let missingField: string | null = null
    if (!nombre) missingField = 'nombre is required'
    if (!apellido) missingField = 'apellido is required'
    if (!username) missingField = 'username is required'
    if (!password) missingField = 'password is required'
    if (!confirmPassword) missingField = 'confirmPassword is required'
    console.log(email)
    if (!email || email.indexOf('@') == -1) missingField = 'email is not valid or required'
    if (missingField != null) return res.status(400).json({ message: `${missingField} is required` })
    if (password != confirmPassword) return res.status(400).json({ message: "Password confirmation doesn't match." })
    // 3. Connect to db
    try {
      const id = await UserRepository.create({ username, password, confirmPassword, nombre, apellido, email, is_active: true })
      res.send({ id })
    } catch (err) {
      res.status(400).json({ "success": false, message: "Registration failed, please verify missing or wrong fields."})
    }
}