function validateList(validChoices) {
	return function (input) {
		if (!validChoices.includes(input)) {
			return `Please select a valid option from the list: ${validChoices.join(', ')}`
		}
		return true
	}
}

function validateName(input) {
	if (!/^[A-Za-z\s]+$/.test(input)) {
		return 'Please enter a name with only letters and no numbers.'
	}
	if (input.length > 30) {
		return 'Name should be 30 characters or less'
	}
	return true
}

function validateSalary(input) {
	if (!/^\d+$/.test(input)) {
		return 'Please enter a valid salary with only numbers.'
	}
	if (input.length > 10) {
		return 'Salary should be 10 characters or less.'
	}
	return true
}

export { validateList, validateName, validateSalary }
