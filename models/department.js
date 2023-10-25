import * as cTable from 'console.table'
import { mainMenu } from '../cli/mainMenu.js'
import { db } from '../config/db.js'

function getAllDepartments() {
	const sql = 'SELECT id, name FROM department'
	db.promise()
		.query(sql)
		.then(([departments]) => {
			console.log('')
			console.log(`================================================`)
			console.log('')
			console.table(departments)
			console.log(`================================================`)
			console.log('')
			mainMenu()
		})
		.catch((err) => console.error(err))
}

export { getAllDepartments }
