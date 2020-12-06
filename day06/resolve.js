const fs = require('fs')

solveDay6('day06/input.txt')

function solveDay6(filePath) {

	const groups = fs.readFileSync(filePath,'utf8').replace(/(\n{1})(.)/gm, "$2").split('\n')

	console.log(countTotalPositiveAnswers(groups))
}

function countTotalPositiveAnswers(groups) {

	const groupsLength = groups.length

	let totalPositiveAnswers = 0
	let i = 0

	while (i < groupsLength) {
		let group = groups[i]

		totalPositiveAnswers += countPositiveAnswersForGroup(group)

		i++
	}

	return totalPositiveAnswers
}

function countPositiveAnswersForGroup(group) {
	const groupLength = group.length

	let positiveAnswers = []
	let i =0

	while(i < groupLength) {
		let positiveAnswer = group[i]
		if(!positiveAnswers.includes(positiveAnswer)) {
			positiveAnswers.push(positiveAnswer)
		}

		i++
	}

	return positiveAnswers.length
}