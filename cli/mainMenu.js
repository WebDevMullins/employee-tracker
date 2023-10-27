import inquirer from 'inquirer'
import { addDepartment, getAllDepartments } from '../models/department.js'
import { addRole, getAllRoles, getDepartments } from '../models/role.js'
import { getAllEmployees } from '../models/employee.js'

const mainMenu = () => {
	inquirer
		.prompt({
			type: 'list',
			name: 'selected',
			message: 'What would you like to do?',
			choices: [
				'View All Departments',
				'View All Roles',
				'View All Employees',
				'Add a Department',
				'Add a Role',
				'Add an Employee',
				'Update an Employee Role',
				'Quit'
			],
			loop: false
		})
		.then(({ selected }) => {
			switch (selected) {
				case 'View All Departments':
					getAllDepartments()
					break
				case 'View All Roles':
					getAllRoles()
					break
				case 'View All Employees':
					getAllEmployees()
					break
				case 'Add a Department':
					addDepartment()
					break
				case 'Add a Role':
					addRole()
					// getDepartments()
					break
			}
		})
}

export { mainMenu }
