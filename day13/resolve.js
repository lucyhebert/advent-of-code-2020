const fs = require('fs')

const filePath = 'day13/input.txt'
const notes = fs.readFileSync(filePath,'utf8').split('\n')
const earliestTimestamp = notes[0]
const busLines = notes[1].split(',').filter((entry) => entry !== 'x')

solveDay13()

function solveDay13() {
	let busLinesDelays = busLines.reduce((acc, busLine) => {
		acc.push({
			id: busLine,
			delay: busLine - earliestTimestamp % busLine
		})
		return acc
	}, [])

	let result = busLinesDelays.filter((line) => line.delay === Math.min(...busLinesDelays.reduce((acc, elem) => {
		acc.push(elem.delay)
		return acc
	}, [])))[0]

	console.log(result.id * result.delay)
}