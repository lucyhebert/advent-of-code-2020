const fs = require('fs')

solveDay9('day09/input.txt')

function solveDay9(filePath) {
	const numbersList = fs.readFileSync(filePath,'utf8').split('\n')
	console.log(findEncryptionWeakness(numbersList, 25))
}

function findEncryptionWeakness(numbersList, preambleLength) {
	let result = {
		referenceNumber: findReferenceNumber(numbersList, preambleLength),
		encryptionWeakness: null
	}

	let testedNumbers = []

	let i = 1
	while(i < numbersList.length) {
		let firstTestedNumber = parseInt(numbersList[i - 1])

		testedNumbers.push(firstTestedNumber)

		let testedNumbersSum = firstTestedNumber

		let j = i
		while(testedNumbersSum < result.referenceNumber && j < numbersList.length) {
			let testedNumber = parseInt(numbersList[j])

			testedNumbersSum += testedNumber
			testedNumbers.push(testedNumber)
			j++
		}

		if(testedNumbersSum == result.referenceNumber) {
			break
		} else {
			testedNumbers = []
		}

		i++
	}

	result.encryptionWeakness = Math.min(...testedNumbers) + Math.max(...testedNumbers)

	return result
}

function findReferenceNumber(numbers, preambleLength) {
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
