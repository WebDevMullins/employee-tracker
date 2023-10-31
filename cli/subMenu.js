import inquirer from 'inquirer'
import { validateList } from '../validators/validation.js'
import { mainMenu } from './mainMenu.js'

// Submenu of prompts
const subMenu = () => {
	inquirer
		.prompt({
			type: 'list',
			name: 'selected',
			message: 'Go to Main Menu or Quit?',
			choices: ['Main Menu', 'Quit'],
			loop: false, // Disables looping of the list at the end
			validate: validateList // Validation of list
		})
		.then(({ selected }) => {
			switch (selected) {
				case 'Main Menu':
					console.clear()
					mainMenu()
					break
				case 'Quit':
					console.clear()
					console.log('Goodbye!')
					process.exit()
			}
		})
}

export { subMenu }
