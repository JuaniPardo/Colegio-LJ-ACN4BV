import mysql, { Pool } from 'mysql2'
import 'dotenv/config'

export const pool: Pool = mysql.createPool({
    host: process.env.DB_MYSQL_HOST ?? '',
    port: Number(process.env.DB_MYSQL_PORT ?? 1234),
    user: process.env.DB_MYSQL_USER ?? '',
    password: process.env.DB_MYSQL_PASSWORD ?? '',
    database: process.env.DB_MYSQL_DATABASE ?? ''
})