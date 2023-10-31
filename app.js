import { mainMenu } from './cli/mainMenu.js'

// Start app
function init() {
	console.clear() // Clear console
	console.log('')
	console.log(`================================================`)
	console.log('')
	console.log('Employee Tracker')
	console.log('')
	console.log(`================================================`)
	console.log('')
	mainMenu() // Display main menu
}

init()
