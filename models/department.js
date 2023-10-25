import { db } from '../config/db.js'

function getAllDepartments() {
	const sql = 'SELECT id, name FROM department'
	db.promise()
		.query(sql)
		.then(([departments]) => {
			console.table(departments)
		})
		.catch(console.error)
		.then(() => db.end())
}

export { getAllDepartments }
