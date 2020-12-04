const fs = require('fs')

solveDay5('day04/input.txt')

function solveDay5(filePath) {

	const lines = fs.readFileSync(filePath,'utf8')

	const regexp = /(\n{1})([a-z])/gm
	const passportsPart1 = lines.replace(regexp, " $2").split('\n')

	console.log(countValidPassportsPart1(passportsPart1))
}

function isValidPassportPart1(passport, requiredFields) {
	return requiredFields.every(el => passport.toLowerCase().includes(el.toLowerCase()));
}

function countValidPassportsPart1(passportsPart1) {

	const passportsLength = passportsPart1.length
	const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

	let passport
	let validPassportsCounter = 0

	let i = 0

	while(i < passportsLength) {
		passport = passportsPart1[i].trim()

		if(isValidPassportPart1(passport, requiredFields)) {
			validPassportsCounter ++
		}
		i++
	}

	return validPassportsCounter
}

function isValidPasswordPart1(password, letter, min, max) {
	let letterRegexp = new RegExp(letter, 'g')

	const letterMatchesLength = password.match(letterRegexp).length

	return letterMatchesLength >= min && letterMatchesLength <= max
}