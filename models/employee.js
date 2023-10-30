import * as cTable from 'console.table'
import inquirer from 'inquirer'
import { mainMenu } from '../cli/mainMenu.js'
import { subMenu } from '../cli/subMenu.js'
import { db } from '../config/db.js'
import { validateList, validateName } from '../validators/validation.js'
import { getRoleTitles } from './role.js'

function getAllEmployees() {
	const sql = `
		SELECT 
			e.id ID, 
			e.first_name "First Name", 
			e.last_name "Last Name", 
			r.title "Job Title", 
			d.name Department, 
			r.salary Salary, 
			CONCAT(m.first_name, ' ', m.last_name) Manager
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
			subMenu()
		})
		.catch((err) => console.error(err))
}

function getEmployeesByName() {
	const sql = `
	SELECT first_name, last_name 
	FROM employee`
	return db
		.promise()
		.query(sql)
		.then(([employee]) => {
			const employeeNameArray = employee.map((employee) => [employee.first_name, employee.last_name].join(' '))
			return employeeNameArray
		})
		.catch((err) => {
			console.error('Error fetching all employee names: ', err)
		})
}

function getManagers() {
	const sql = `
	SELECT first_name, last_name, manager_id 
	FROM employee
	WHERE manager_id IS NULL`
	return db
		.promise()
		.query(sql)
		.then(([manager]) => {
			const managersArray = manager.map((employee) => [employee.first_name, employee.last_name].join(' '))
			return managersArray
		})
		.catch((err) => {
			console.error('Error fetching all manager names: ', err)
		})
}

// employee’s first name, last name, role, and manager
function addEmployee() {
	Promise.all([getRoleTitles(), getManagers()]).then(([roles, managers]) => {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'fName',
					message: 'What is their first name?',
					validate: validateName
				},
				{
					type: 'input',
					name: 'lName',
					message: 'What is their last name?',
					validate: validateName
				},
				{
					type: 'list',
					name: 'role',
					message: 'What is their role?',
					choices: roles,
					loop: false,
					pageSize: 10,
					validate: validateList
				},
				{
					type: 'list',
					name: 'manager',
					message: 'Who is their manager?',
					choices: managers,
					loop: false,
					pageSize: 10,
					validate: validateList
				}
			])
			.then(({ fName, lName, role, manager }) => {
				const roleId = roles.indexOf(role) + 1
				const managerId = managers.indexOf(manager) + 1
				let sql = `
			INSERT INTO employee (first_name, last_name, role_id, manager_id) 
			VALUES (?, ?, ?, ?)`
				db.promise()
					.query(sql, [fName, lName, roleId, managerId])
					.then(() => {
						console.clear()
						console.log('')
						console.log('================================================')
						console.log('')
						console.log(`${fName} ${lName} added to the database`)
						getAllEmployees()
					})
				subMenu()
			})
			.catch((err) => console.error('Error adding department:', err))
	})
}

export { addEmployee, getAllEmployees, getEmployeesByName, getManagers }
