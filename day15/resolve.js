const fs = require('fs')
const _ = require('lodash');

const filePath = 'day15/input.txt'
const startingNumbers = fs.readFileSync(filePath,'utf8').split(',')

solveDay15()

function solveDay15() {
	console.log(getFinalSpokenNumber(2020))
	console.log(getFinalSpokenNumber(30000000))
}

function getFinalSpokenNumber(index) {

	let startingNumbersLength = startingNumbers.length
	let memo = _.cloneDeep(startingNumbers).reduce((acc, number, index) => {
		acc[number] = [index + 1]
		return acc
	}, {})

	let lastSpokenNumber = startingNumbers[startingNumbers.length - 1]

	for(let i = startingNumbersLength; i < index; i++) {
		let previousMemoEntry = memo[lastSpokenNumber]
		let previousMemoEntryLength = previousMemoEntry.length
		let currentNumber

		if(previousMemoEntry && previousMemoEntry.length < 2) {
			currentNumber = 0
		} else {
			currentNumber = previousMemoEntry[previousMemoEntryLength - 1] - previousMemoEntry[previousMemoEntryLength - 2]
		}

		lastSpokenNumber = currentNumber

		let newMemoEntry = memo[currentNumber]

		if(newMemoEntry) {
			newMemoEntry.push(i + 1)
			if(newMemoEntry.length > 2) {
				newMemoEntry.slice(0, 1)
			}
		} else {
			memo[currentNumber] = [i + 1]
		}
	}

	return lastSpokenNumber
}