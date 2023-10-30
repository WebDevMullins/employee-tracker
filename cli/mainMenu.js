import inquirer from 'inquirer'
import { addDepartment, getAllDepartments } from '../models/department.js'
import { addEmployee, getAllEmployees } from '../models/employee.js'
import { addRole, getAllRoles, updateRole } from '../models/role.js'
import { validateList } from '../validators/validation.js'

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
			loop: false,
			pageSize: 8,
			validate: validateList
		})
		.then(({ selected }) => {
			switch (selected) {
				case 'View All Departments':
					console.clear()
					getAllDepartments()
					break
				case 'View All Roles':
					console.clear()
					getAllRoles()
					break
				case 'View All Employees':
					console.clear()
					getAllEmployees()
					break
				case 'Add a Department':
					console.clear()
					addDepartment()
					break
				case 'Add a Role':
					console.clear()
					addRole()
					break
				case 'Add an Employee':
					console.clear()
					addEmployee()
					break
				case 'Update an Employee Role':
					console.clear()
					updateRole()
					break
				case 'Quit':
					console.clear()
					console.log('Goodbye!')
					process.exit()
			}
		})
}

export { mainMenu }
