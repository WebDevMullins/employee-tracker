import * as cTable from 'console.table'
import { mainMenu } from '../cli/mainMenu.js'
import { db } from '../config/db.js'

function getAllEmployees() {
	const sql = `
		SELECT 
			e.id AS EmployeeID, 
			e.first_name AS FirstName, 
			e.last_name AS LastName, 
			r.title AS JobTitle, 
			d.name AS Department, 
			r.salary AS Salary, 
			CONCAT(m.first_name, ' ', m.last_name) AS Manager
		FROM employee e
		INNER JOIN role r ON e.role_id = r.id
		INNER JOIN department d ON r.department_id = d.id
		LEFT JOIN employee m ON e.manager_id = m.id
		ORDER BY e.id ASC`
	db.promise()
		.query(sql)
		.then(([emplpoyees]) => {
			console.log('')
			console.log(`================================================`)
			console.log('')
			console.table(emplpoyees)
			console.log(`================================================`)
			console.log('')
			mainMenu()
		})
		.catch((err) => console.error(err))
}

export { getAllEmployees }
