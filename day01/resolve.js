const fs = require('fs')

solveDay5('day01/input.txt')

function solveDay5(filePath) {

	const expenses = fs.readFileSync(filePath,'utf8').split('\n')
	const correctEntries = getCorrectEntries(expenses)
	const result = calculateResult(correctEntries[0], correctEntries[1])

	console.log(result)
}


function getCorrectEntries(entries) {
	var result = [];
	const entriesLength = entries.length;
	var i = 0;

	while(i < entriesLength) {

		var j = i + 1
		var entry1 = parseInt(entries[i], 10)

		while(j < entriesLength) {

			var entry2 = parseInt(entries[j], 10)

			if(entry1 + entry2 === 2020) {
				result = [entry1, entry2];
				return result
			} else {
				j++
			}
		}

		if(result.length > 0) {
			break;
		} else {
			i++
		}
	}
}


function calculateResult(entry1, entry2) {
	return entry1 * entry2
}
