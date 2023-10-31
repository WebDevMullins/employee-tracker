import * as cTable from 'console.table'
import inquirer from 'inquirer'
import { subMenu } from '../cli/subMenu.js'
import { db } from '../config/db.js'
import { validateName } from '../validators/validation.js'

// Get all ids and names from the department table
function getAllDepartments() {
	const sql = 'SELECT id ID, name Department FROM department'
	db.promise()
		.query(sql)
		.then(([departments]) => {
			console.log('')
			console.log(`================================================`)
			console.log('')
			console.table(departments) // Display table
			console.log(`================================================`)
			console.log('')
			subMenu() // Display submenu
		})
		.catch((err) => console.error('Error fetching all departments: ', err))
}

// Get all names from the department table
function getDepartmentNames() {
	const sql = 'SELECT name FROM department'
	return db
		.promise()
		.query(sql)
		.then(([departments]) => {
			// Map over results and save to array
			const deptsArray = departments.map((department) => department.name)
			return deptsArray
		})
		.catch((err) => {
			console.error('Error fetching all departments: ', err)
		})
}

// Add department to the department table
function addDepartment() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'newDepartment',
				message: 'What is the department name?',
				validate: validateName // Validation of list
			}
		])
		.then(({ newDepartment }) => {
			let sql = 'INSERT INTO department (name) VALUES (?)'
			db.promise()
				.query(sql, [newDepartment])
				.then(() => {
					console.clear()
					console.log('')
					console.log('================================================')
					console.log('')
					console.log(`${newDepartment} department added to the database`)
					getAllDepartments() // Display department table
				})
		})
		.catch((err) => console.error('Error adding department:', err))
}

export { addDepartment, getAllDepartments, getDepartmentNames }
