import inquirer from 'inquirer'
import { getAllDepartments } from '../models/department.js'

async function mainMenu() {
	const { selected } = await inquirer.prompt({
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
	switch (selected) {
		case 'View All Departments':
			getAllDepartments()
			break
	}
}

export { mainMenu }
