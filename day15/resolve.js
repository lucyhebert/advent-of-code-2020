const fs = require('fs')
const _ = require('lodash');

const filePath = 'day15/input.txt'
const startingNumbers = fs.readFileSync(filePath,'utf8').split(',')

solveDay15()

function solveDay15() {
	console.log(getFinalNumber(2020))
}

function getFinalNumber(index) {

	let startingNumbersLength = startingNumbers.length
	let memo = _.cloneDeep(startingNumbers).reduce((acc, number, index) => {
		acc[number] = [index + 1]
		return acc
	}, {})

	let spokenNumbers = _.cloneDeep(startingNumbers)

	for(let i = startingNumbersLength; i < index; i++) {
		let previousNumber = spokenNumbers[i - 1]
		let previousMemoEntry = memo[previousNumber]
		let previousMemoEntryLength = previousMemoEntry.length
		let currentNumber

		if(previousMemoEntry && previousMemoEntry.length < 2) {
			currentNumber = 0
		} else {
			currentNumber = previousMemoEntry[previousMemoEntryLength - 1] - previousMemoEntry[previousMemoEntryLength - 2]
		}

		spokenNumbers.push(currentNumber)

		let newMemoEntry = memo[currentNumber]

		if(newMemoEntry) {
			newMemoEntry.push(i + 1)
		} else {
			memo[currentNumber] = [i + 1]
		}
	}

	return spokenNumbers[spokenNumbers.length - 1]
}