const fs = require('fs')

solveDay5('day02/input.txt')

function solveDay5(filePath) {

	const lines = fs.readFileSync(filePath,'utf8').split('\n')
	console.log(countValidPasswords(lines))
}

function countValidPasswords(lines) {
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

		if(isValidPassword(lineInfo.password, lineInfo.letter, lineInfo.min, lineInfo.max)) {
			count++
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

function isValidPassword(password, letter, min, max) {
	let letterRegexp = new RegExp(letter, 'g')

	const letterMatchesLength = password.match(letterRegexp).length

	return letterMatchesLength >= min && letterMatchesLength <= max
}
