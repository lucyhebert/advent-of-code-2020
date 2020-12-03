const fs = require('fs')

solveDay5('day03/input.txt')

function solveDay5(filePath) {

	const lines = fs.readFileSync(filePath,'utf8').split('\n')

	const slopes = [
		{
			right: 1,
			down: 1
		},
		{
			right: 3,
			down: 1
		},
		{
			right: 5,
			down: 1
		},
		{
			right: 7,
			down: 1
		},
		{
			right: 1,
			down: 2
		}
	]

	console.log(countEncounteredTrees(lines, slopes[1]))
	console.log(multiplySlopesTreesCounters(lines, slopes))

}

function multiplySlopesTreesCounters(lines, slopes) {
	const slopesLength = slopes.length
	let result = 1

	let i = 0

	while(i < slopesLength) {
		let treesCount = countEncounteredTrees(lines, slopes[i])
		result = result * treesCount
		i++
	}

	return result
}

function countEncounteredTrees(lines, slope) {
	const linesLength = lines.length //1000
	const lineWidth = lines[0].length //17

	let line

	let i = 0
	let xCursor = 0
	let yCursor = 0
	let treesCounter = 0

	while(i < linesLength) {
		line = lines[i]

		if(line[yCursor] === '#') {
			treesCounter++
		}

		yCursor = (yCursor + slope.right) % lineWidth
		i += slope.down


	}

	return treesCounter
}
