const fs = require('fs')

solveDay9('day09/input.txt')

function solveDay9(filePath) {
	const numbers = fs.readFileSync(filePath,'utf8').split('\n')
	console.log(findWrongNumber(numbers, 25))
}

function findWrongNumber(numbers, preambleLength) {
	let result = false

	let j = preambleLength + 1
	while(j < numbers.length) {

		const preamble = numbers.slice(j - preambleLength - 1, j)
		const possibleSumsResults = getPossibleSumsResults(preamble)
		const testedNumber = parseInt(numbers[j])

		if(!possibleSumsResults.includes(testedNumber)) {
			result = testedNumber
			break
		}

		j++
	}

	return result
}

function getPossibleSumsResults(preamble) {
	return [...preamble.reduce((accumulator, number) => {
		let i = 0

		while(i < preamble.length) {
			let preambleNumber = preamble[i]

			if(preambleNumber !== number) {
				accumulator.add(parseInt(number) + parseInt(preamble[i]))
			}

			i++
		}

		return accumulator
	}, new Set())]
}
