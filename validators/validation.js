// Validate input from list choice
function validateList(validChoices) {
	return function (input) {
		// Test input for a match in the list
		if (!validChoices.includes(input)) {
			return `Please select a valid option from the list: ${validChoices.join(', ')}`
		}
		return true
	}
}

// Validate name inputs
function validateName(input) {
	// Test input for only letters and numbers
	if (!/^[A-Za-z\s]+$/.test(input)) {
		return 'Please enter a name with only letters and no numbers.'
	}
	// Test input for 30 or less characters
	if (input.length > 30) {
		return 'Name should be 30 characters or less'
	}
	return true
}

// Validate salary input
function validateSalary(input) {
	// Test input for only numbers
	if (!/^\d+$/.test(input)) {
		return 'Please enter a valid salary with only numbers.'
	}
	// Test input for 10 or less characters
	if (input.length > 10) {
		return 'Salary should be 10 characters or less.'
	}
	return true
}

export { validateList, validateName, validateSalary }
