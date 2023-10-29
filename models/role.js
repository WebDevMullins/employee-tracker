import * as cTable from 'console.table'
import inquirer from 'inquirer'
import { mainMenu } from '../cli/mainMenu.js'
import { db } from '../config/db.js'
import { getDepartmentNames } from './department.js'

function getAllRoles() {
	const sql = `
	SELECT 
		r.id, r.title, d.name, r.salary 
	FROM role r
	INNER JOIN department d
	ON r.department_id = d.id
	ORDER BY department_id ASC`
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

function addRole() {
	getDepartmentNames()
		.then((departments) => {
			inquirer
				.prompt([
					{
						type: 'input',
						name: 'name',
						message: 'What is the role name?'
					},
					{
						type: 'input',
						name: 'salary',
						message: 'What is the salary?'
					},
					{
						type: 'list',
						name: 'department',
						message: 'What is the department name?',
						choices: departments,
						loop: false
					}
				])
				.then(({ name, salary, department }) => {
					const departmentId = departments.indexOf(department) + 1
					let sql = `
					INSERT INTO role (title, salary, department_id)
					VALUES (?, ?, ?)`
					db.promise()
						.query(sql, [name, salary, departmentId])
						.then(() => {
							console.log('')
							console.log('================================================')
							console.log('')
							console.log(`${name} role successfully added to the ${department} department!`)
							getAllRoles() // Assuming you have a function named getAllRoles
						})
						.catch((err) => console.error('Error adding role:', err))
				})
				.catch((err) => console.error('Error prompting for role details:', err))
		})
		.catch((err) => console.error('Error getting departments:', err))
}

export { addRole, getAllRoles }
