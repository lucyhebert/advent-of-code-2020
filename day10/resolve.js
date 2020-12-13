const fs = require('fs')

solveDay10('day10/input.txt')

function solveDay10(filePath) {
	const adaptersList = fs.readFileSync(filePath,'utf8').split('\n')
	const effectiveJoltage = 0

	adaptersList.push(effectiveJoltage)

	const sortedAdapters = adaptersList.reduce((accumulator, joltage) => {
		accumulator.push(parseInt(joltage))
		return accumulator
	}, []).sort((a, b) => a - b)

	console.log(findDifferencesResult(sortedAdapters))
	console.log(countPossibleCombinations(sortedAdapters))
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

function countPossibleCombinations(sortedAdapters, testedSubCombinations={}) {

    const sortedAdaptersStringKey = sortedAdapters.join`,`

    if(sortedAdaptersStringKey in testedSubCombinations) {
        return testedSubCombinations[sortedAdaptersStringKey]
    }

    let totalPossibleCombinationsCounter = 1

    for(let i = 1; i < sortedAdapters.length - 1; i++) {
        let previousAdapter = sortedAdapters[i - 1]
        let nextAdapter = sortedAdapters[i + 1]

        if(nextAdapter - previousAdapter <= 3) {
            const possibleCombination = [previousAdapter].concat(sortedAdapters.slice(i + 1))
            totalPossibleCombinationsCounter += countPossibleCombinations(possibleCombination, testedSubCombinations)
        }
    }

    testedSubCombinations[sortedAdaptersStringKey] = totalPossibleCombinationsCounter;

    return totalPossibleCombinationsCounter;
}