import * as cTable from 'console.table'
import inquirer from 'inquirer'
import { subMenu } from '../cli/subMenu.js'
import { db } from '../config/db.js'
import { validateList, validateName } from '../validators/validation.js'
import { getRoleTitles } from './role.js'

// Get employee by id, first and last name, role, salary, and manager
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
			console.table(emplpoyees) // Display table
			console.log(`================================================`)
			console.log('')
			subMenu() // Display submenu
		})
		.catch((err) => console.error(err))
}

// Get all employees by first and last name
function getEmployeesByName() {
	const sql = `
	SELECT first_name, last_name 
	FROM employee`
	return db
		.promise()
		.query(sql)
		.then(([employee]) => {
			// Map over result and save to array
			const employeeNameArray = employee.map((employee) => [employee.first_name, employee.last_name].join(' '))
			return employeeNameArray
		})
		.catch((err) => {
			console.error('Error fetching all employee names: ', err)
		})
}

// Get managers by first and last name
function getManagers() {
	const sql = `
	SELECT first_name, last_name, manager_id 
	FROM employee
	WHERE manager_id IS NULL`
	return db
		.promise()
		.query(sql)
		.then(([manager]) => {
			// Map over result and save as array
			const managersArray = manager.map((employee) => [employee.first_name, employee.last_name].join(' '))
			return managersArray
		})
		.catch((err) => {
			console.error('Error fetching all manager names: ', err)
		})
}

// Add employee
function addEmployee() {
	// Get all role names and manager names
	Promise.all([getRoleTitles(), getManagers()]).then(([roles, managers]) => {
		console.log(managers)
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
					choices: [...managers, new inquirer.Separator(), 'No Manager'],
					loop: false,
					pageSize: 10,
					validate: validateList
				}
			])
			.then(({ fName, lName, role, manager }) => {
				const roleId = roles.indexOf(role) + 1 // Add 1 to the index of the response array to get the role id
				let managerId = null

				if (managerId !== 'No Manager') {
					const managerIndex = managers.indexOf(manager)
					if (managerIndex !== -1) {
						// Add 1 to the index of the response array to get the manager id
						managerId = managerIndex + 1
					}
				}

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
						getAllEmployees() // Display employee table
					})
			})
			.catch((err) => console.error('Error adding department:', err))
	})
}

export { addEmployee, getAllEmployees, getEmployeesByName, getManagers }
