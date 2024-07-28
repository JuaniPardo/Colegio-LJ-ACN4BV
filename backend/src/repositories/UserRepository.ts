// @ts-nocheck
import DBLocal from 'db-local'
import crypto from 'crypto'
import { SALT_ROUNDS } from '../config/config'
import bcrypt from 'bcrypt'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  is_active: { type: Boolean, required: true, default: true }
})

export type LoginCredentials = {
  username: string,
  password: string
}

export type RegisterCredentials = {
  username: string,
  password: string,
  confirmPassword: string
  nombre: string,
  apellido: string,
  email: string,
  is_active: boolean
}

export class UserRepository {
  static async create ({ username, password, confirmPassword, nombre, apellido, email }: RegisterCredentials ) {
    // 1. Validations
    Validation.username(username)
    Validation.password(password)
    Validation.passwordMatch(password, confirmPassword)
    Validation.email(email)
    // 2. Check user doesn't exists
    const user = User.findOne((obj) => {
      return obj.username === username || obj.email === email
    })
    if (user) throw new Error('User with that email or username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword,
      nombre,
      apellido,
      email,
      is_active: true
    }).save()

    return id
  }

  static async login ({ username, password }: LoginCredentials) {
    // 1. Validations
    Validation.username(username)
    Validation.password(password)
    // 2. Check user doesn't exists
    const user = User.findOne({ username })
    if (!user) throw new Error('username not found')
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('password is not valid')

    const { password: _, ...publicUser } = user
    return publicUser
  }
}

class Validation {
  static username (username: string) {
    if (typeof username !== 'string') { throw new Error('username must be a string') }
    if (username.length < 3) { throw new Error('username must be at least 3 characters long') }
  }

  static password (password: string) {
    if (typeof password !== 'string') { throw new Error('password must be a string') }
    if (password.length < 6) { throw new Error('password must be at lest 4 characters long') }
  }

  static passwordMatch (password: string, confirmPassword: string) {
    if (password != confirmPassword) { throw new Error('password doesn\'t match') }
  }

  static email (email: string) {
    if (!email || email.indexOf('@') == -1) { throw new Error('email is not valid or required')}
  }
}