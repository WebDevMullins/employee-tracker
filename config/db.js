import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

const db = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'company_db'
})

// db.connect(function (err) {
// 	err ? console.error('error connecting: ' + err.stack) : console.log('connected as id ' + db.threadId)
// })

export { db }
