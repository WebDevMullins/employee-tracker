import * as cTable from 'console.table'
import inquirer from 'inquirer'
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

// enter the name, salary, and department for the role and that role is added to the database
const getDepartments = () => {
	const sql = 'SELECT name FROM department'
	return db
		.promise()
		.query(sql)
		.then(([departments]) => {
			const deptsArray = departments.map((department) => department.name)
			return deptsArray
		})
		.catch((err) => {
			console.error('Error fetching all departments: ', err)
			throw err // Re-throw the error to handle it outside this function
		})
}

function addRole() {
	getDepartments()
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
					let sql = 'INSERT INTO role (title, salary, department_name) VALUES (?, ?, ?)'
					db.promise()
						.query(sql, [name, salary, department])
						.then(() => {
							console.log('')
							console.log('================================================')
							console.log('')
							console.log(`${name} role successfully added!`)
							getAllRoles() // Assuming you have a function named getAllRoles
						})
						.catch((err) => console.error('Error adding role:', err))
				})
				.catch((err) => console.error('Error prompting for role details:', err))
		})
		.catch((err) => console.error('Error getting departments:', err))
}

export { addRole, getAllRoles, getDepartments }
