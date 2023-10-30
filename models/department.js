import * as cTable from 'console.table'
import inquirer from 'inquirer'
import { mainMenu } from '../cli/mainMenu.js'
import { db } from '../config/db.js'
import { validateName } from '../validators/validation.js'

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
		.catch((err) => console.error('Error fetching all departments: ', err))
}

function getDepartmentNames() {
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
		})
}

function addDepartment() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'newDepartment',
				message: 'What is the department name?',
				validate: validateName
			}
		])
		.then(({ newDepartment }) => {
			let sql = 'INSERT INTO department (name) VALUES (?)'
			db.promise()
				.query(sql, [newDepartment])
				.then(() => {
					console.log('')
					console.log('================================================')
					console.log('')
					console.log(`${newDepartment} department successfully added!`)
					getAllDepartments()
				})
		})
		.catch((err) => console.error('Error adding department:', err))
}

export { addDepartment, getAllDepartments, getDepartmentNames }
