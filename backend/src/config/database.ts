import mysql, { Pool } from 'mysql2'
import 'dotenv/config'

export const dbPoolConnection: Pool = mysql.createPool({
    host: process.env.DB_MYSQL_HOST ?? 'localhost',
    port: Number(process.env.DB_MYSQL_PORT) ?? 3307,
    user: process.env.DB_MYSQL_USER ?? 'root',
    password: process.env.DB_MYSQL_PASSWORD ?? 'password',
    database: process.env.DB_MYSQL_DATABASE ?? 'colegiotp'
})