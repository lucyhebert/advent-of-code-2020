const fs = require('fs')

solveDay6('day06/input.txt')

function solveDay6(filePath) {

	const groups = fs.readFileSync(filePath,'utf8').replace(/(\n{1})(.)/gm, " $2").split('\n')

	console.log(countTotalPositiveAnswers(groups))
}

function countTotalPositiveAnswers(groups) {

	const groupsLength = groups.length

	let totalPositiveAnswers = 0
	let totalPositiveAnswersForEveryoneInGroup = 0
	let i = 0

	while (i < groupsLength) {
		let group = groups[i]

		let result = countPositiveAnswersInGroup(group)
		totalPositiveAnswers += result[0]
		totalPositiveAnswersForEveryoneInGroup += result[1]

		i++
	}

	return [totalPositiveAnswers, totalPositiveAnswersForEveryoneInGroup]
}


function countPositiveAnswersInGroup(group) {
	const groupLength = group.trim().split(' ').length
	const sortedGroupAnswers = (group.replace(/\s/g, '')).split('').sort().join('')

	let positiveAnswersCounter = 0
	let positiveAnswersForEveryoneCounter = 0

	let i = 0

	while(i < sortedGroupAnswers.length) {
		if(i == 0 || i > 0 && sortedGroupAnswers[i] !== sortedGroupAnswers[i - 1]) {
			let regexp = new RegExp(sortedGroupAnswers[i], 'g')
			let answerCount = sortedGroupAnswers.match(regexp)?.length

			positiveAnswersCounter++

			if(answerCount === groupLength) {
				positiveAnswersForEveryoneCounter++
			}
		}

		i++
	}

	return [positiveAnswersCounter, positiveAnswersForEveryoneCounter]
}