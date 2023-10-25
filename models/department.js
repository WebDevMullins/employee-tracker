import { mainMenu } from '../cli/mainMenu.js'
import { db } from '../config/db.js'

function getAllDepartments() {
	const sql = 'SELECT id AS id, name AS department FROM department'
	db.promise()
		.query(sql)
		.then(([departments]) => {
			// console.log(`================================================`)
			console.table(departments)
			// console.log(`================================================`)
			mainMenu()
		})
		.catch((err) => console.error(err))
}

export { getAllDepartments }
