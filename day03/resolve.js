const fs = require('fs')

solveDay5('day03/input.txt')

function solveDay5(filePath) {

	const lines = fs.readFileSync(filePath,'utf8').split('\n')

	console.log(countEncounteredTrees(lines))

}

function countEncounteredTrees(lines) {
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

		yCursor = (yCursor + 3) % lineWidth //3 to right
		i++ //1 to bottom


	}

	return treesCounter
}
