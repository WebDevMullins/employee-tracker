import * as cTable from 'console.table'
import inquirer from 'inquirer'
import { subMenu } from '../cli/subMenu.js'
import { db } from '../config/db.js'
import { validateList, validateName, validateSalary } from '../validators/validation.js'
import { getDepartmentNames } from './department.js'
import { getAllEmployees, getEmployeesByName } from './employee.js'

// Get role id, title, department name (from department table), salary
function getAllRoles() {
	const sql = `
	SELECT 
		r.id ID, r.title Title, d.name "Deptartment", r.salary Salary 
	FROM role r
	INNER JOIN department d
	ON r.department_id = d.id
	ORDER BY id ASC`
	db.promise()
		.query(sql)
		.then(([roles]) => {
			console.log('')
			console.log(`================================================`)
			console.log('')
			console.table(roles) // Display table
			console.log(`================================================`)
			console.log('')
			subMenu() // Display submenu
		})
		.catch((err) => console.error(err))
}

// Get all role titles
function getRoleTitles() {
	const sql = 'SELECT title FROM role'
	return db
		.promise()
		.query(sql)
		.then(([roles]) => {
			// Map over results and save as array
			const titlesArray = roles.map((role) => role.title)
			return titlesArray
		})
		.catch((err) => {
			console.error('Error fetching all role titles: ', err)
		})
}

// Add role to table
function addRole() {
	getDepartmentNames() // Get all department names
		.then((departments) => {
			inquirer
				.prompt([
					{
						type: 'input',
						name: 'name',
						message: 'What is the role name?',
						validate: validateName
					},
					{
						type: 'input',
						name: 'salary',
						message: 'What is the salary?',
						validate: validateSalary
					},
					{
						type: 'list',
						name: 'department',
						message: 'What is the department name?',
						choices: departments,
						loop: false,
						pageSize: 10,
						validate: validateList
					}
				])
				.then(({ name, salary, department }) => {
					const departmentId = departments.indexOf(department) + 1 // Add 1 to the index of the response array to get the department
					let sql = `
					INSERT INTO role (title, salary, department_id)
					VALUES (?, ?, ?)`
					db.promise()
						.query(sql, [name, salary, departmentId])
						.then(() => {
							console.clear()
							console.log('')
							console.log('================================================')
							console.log('')
							console.log(`${name} role successfully added to the ${department} department`)
							getAllRoles() // Display role table
						})
				})
				.catch((err) => console.error('Error prompting for role details:', err))
		})
		.catch((err) => console.error('Error getting departments:', err))
}

// Update the employees role
function updateRole() {
	// Get all employee names and all role titles
	Promise.all([getEmployeesByName(), getRoleTitles()])
		.then(([employees, roles]) => {
			inquirer
				.prompt([
					{
						type: 'list',
						name: 'employee',
						message: 'Which employee would you like to update?',
						choices: employees,
						loop: false,
						pageSize: 10,
						validate: validateList
					},
					{
						type: 'list',
						name: 'role',
						message: 'Which role would you like to assign?',
						choices: roles,
						loop: false,
						pageSize: 10,
						validate: validateList
					}
				])
				.then(({ employee, role }) => {
					const employeeId = employees.indexOf(employee) + 1 // Add 1 to the index of the response array to get the employee id
					const roleId = roles.indexOf(role) + 1 // Add 1 to the index of the response array to get the role id
					let sql = `
					UPDATE employee e
					SET e.role_id = ?
					WHERE e.id = ?`
					db.promise()
						.query(sql, [roleId, employeeId])
						.then(() => {
							console.log('')
							console.log('================================================')
							console.log('')
							console.log(`${employee}'s role updated to ${role}`)
							getAllEmployees() // Display employee table
						})
						.catch((err) => console.error('Error updating role:', err))
				})
				.catch((err) => console.error('Error prompting:', err))
		})
		.catch((err) => console.error('Error getting names or roles:', err))
}

export { addRole, getAllRoles, getRoleTitles, updateRole }
