import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

// Connection to database
const db = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER, // Username from .env file
	password: process.env.DB_PASSWORD, // Password from .env file
	database: 'company_db'
})

export { db }
