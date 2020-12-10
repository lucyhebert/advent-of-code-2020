const fs = require('fs')

solveDay10('day10/input.txt')

function solveDay10(filePath) {
	const joltageRatings = fs.readFileSync(filePath,'utf8').split('\n')
	const effectiveJoltage = 0

	joltageRatings.push(effectiveJoltage)

	const sortedJoltage = joltageRatings.reduce((accumulator, joltage) => {
		accumulator.push(parseInt(joltage))
		return accumulator
	}, []).sort((a, b) => a - b)

 	console.log(findDifferencesResult(sortedJoltage))
}

function findDifferencesResult(sortedJoltage) {
	let oneDifferences = 0
	let threeDifferences = 1

	let i = 0
	while(i < sortedJoltage.length) {
		if(sortedJoltage[i + 1] - sortedJoltage[i] === 1) {
			oneDifferences += 1
		} else if(sortedJoltage[i + 1] - sortedJoltage[i] === 3) {
			threeDifferences += 1
		}

		i++
	}

	return oneDifferences * threeDifferences
}
