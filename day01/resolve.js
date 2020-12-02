const fs = require('fs')

solveDay5('day01/input.txt')

function solveDay5(filePath) {

	const expenses = fs.readFileSync(filePath,'utf8').split('\n')

	const correctEntriesPart1 = getCorrectEntries(expenses)
	const resultPart1 = calculateResult(correctEntriesPart1)

	console.log(resultPart1)

	const correctEntriesPart2 = getCorrectEntries(expenses, 3)
	const resultPart2 = calculateResult(correctEntriesPart2)

	console.log(resultPart2)
}


function getCorrectEntries(entries, numberOfEntriesRequired = 2) {
	var result = [];
	const entriesLength = entries.length;
	var i = 0;

	while(i < entriesLength) {

		var entry1 = parseInt(entries[i], 10)
		var j = i + 1

		while(j < entriesLength) {

			var entry2 = parseInt(entries[j], 10)

			if(numberOfEntriesRequired === 3) {

				if(entry1 + entry2 > 2020){
					j++
					continue
				}

				var k = j + 1

				while(k < entriesLength) {

					var entry3 = parseInt(entries[k], 10)

					if(entry1 + entry2 + entry3 === 2020) {
						result = [entry1, entry2, entry3];
						return result
					}

					k++
				}

				j++
			} else {
				if(entry1 + entry2 === 2020) {
					result = [entry1, entry2];
					return result
				}

				j++
			}
		}

		i++
	}
}


function calculateResult(entries) {
	return entries.reduce((a, b) => a * b)
}
