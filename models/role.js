import * as cTable from 'console.table'
import { mainMenu } from '../cli/mainMenu.js'
import { db } from '../config/db.js'

function getAllRoles() {
	const sql =
		'SELECT role.id, role.title, department.name, role.salary FROM role INNER JOIN department ON role.department_id=department.id'
	db.promise()
		.query(sql)
		.then(([roles]) => {
			console.log('')
			console.log(`================================================`)
			console.log('')
			console.table(roles)
			console.log(`================================================`)
			console.log('')
			mainMenu()
		})
		.catch((err) => console.error(err))
}

export { getAllRoles }
