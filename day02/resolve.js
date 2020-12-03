const fs = require('fs')

solveDay5('day02/input.txt')

function solveDay5(filePath) {

	const lines = fs.readFileSync(filePath,'utf8').split('\n')
	console.log(countValidPasswords(lines, 1))
	console.log(countValidPasswords(lines, 2))
}

function countValidPasswords(lines, policy) {
	const linesLength = lines.length

	let line
	let lineInfo
	let count = 0

	let i = 0

	while(i < linesLength) {
		line = lines[i]

		lineInfo = getLineInfo(line)

		if(!lineInfo.password.includes(lineInfo.letter)) {
			i++
			continue
		}

		if(policy === 2) {
			if(isValidPasswordPart2(lineInfo.password, lineInfo.letter, lineInfo.min, lineInfo.max)) {
				count++
			}
		} else {
			if(isValidPasswordPart1(lineInfo.password, lineInfo.letter, lineInfo.min, lineInfo.max)) {
				count++
			}
		}

		i++
	}

	return count
}

function getLineInfo(line) {
	const regexp = /^(?<min>\d+)-(?<max>\d+)\s(?<letter>[a-z]):\s(?<password>\w+)$/

	let splittedLine = line.match(regexp)

	let min = parseInt(splittedLine.groups.min)
	let max = parseInt(splittedLine.groups.max)
	let letter = splittedLine.groups.letter
	let password = splittedLine.groups.password

	return { min: min, max: max, letter: letter, password: password }
}

function isValidPasswordPart1(password, letter, min, max) {
	let letterRegexp = new RegExp(letter, 'g')

	const letterMatchesLength = password.match(letterRegexp).length

	return letterMatchesLength >= min && letterMatchesLength <= max
}

function isValidPasswordPart2(password, letter, min, max) {
	return password[min - 1] === letter && password[max - 1] !== letter || password[min - 1] !== letter && password[max - 1] === letter
}
