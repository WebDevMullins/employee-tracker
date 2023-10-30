import inquirer from 'inquirer'
import { addDepartment, getAllDepartments } from '../models/department.js'
import { addEmployee, getAllEmployees } from '../models/employee.js'
import { addRole, getAllRoles, updateRole } from '../models/role.js'

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
					break
				case 'Add an Employee':
					addEmployee()
					break
				case 'Update an Employee Role':
					updateRole()
					break
				case 'Quit':
					console.clear()
					console.log('Goodbye!')
					process.exit()
					break
			}
		})
}

export { mainMenu }
