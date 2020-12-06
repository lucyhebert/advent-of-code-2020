const fs = require('fs')

solveDay4('day04/input.txt')

function solveDay4(filePath) {

	const lines = fs.readFileSync(filePath,'utf8')

	const passports = lines.replace(/(\n{1})(.)/gm, " $2").split('\n')

	console.log(countValidPassports(passports))
}

function countValidPassports(passports) {

	const passportsLength = passports.length

	let validPassportsCounter = 0
	let validPassportPart2Counter = 0

	let i = 0

	while (i < passportsLength) {
		let passport = passports[i]

		if(isValidPassportPart1(passport)) {
			validPassportsCounter++

			if(isValidPassportPart2(passport)) {
				validPassportPart2Counter++
			}
		}

		i++
	}

	return [validPassportsCounter, validPassportPart2Counter]
}

function isValidPassportPart1(passport) {
	const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
	return requiredFields.every(el => passport.toLowerCase().includes(el.toLowerCase()));
}

function isValidPassportPart2(passport) {

	const regexpList = [
		/byr:(19[2-9][0-9]|200[0-2])/g,
		/iyr:(201[0-9]|2020)/g,
		/eyr:(202[0-9]|2030)/g,
		/hgt:(((1[5-8][0-9])|(19[0-3]))cm|(59|(6[0-9])|(7[0-6]))in)/g,
		/hcl:#([0-9]|[a-f]){6}/g,
		/ecl:(amb|blu|brn|gry|grn|hzl|oth)/g,
		/pid:\b[0-9]{9}\b/g
	]

	let regexpsListLength = regexpList.length

	let i = 0
	while(i < regexpsListLength) {
		if(!passport.match(regexpList[i])) {
			return false
		}
		i++
	}

	return true
}
