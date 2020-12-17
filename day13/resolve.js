const fs = require('fs')

const filePath = 'day13/input.txt'
const notes = fs.readFileSync(filePath,'utf8').split('\n')
const earliestTimestamp = notes[0]
const busLines = notes[1].split(',')

solveDay13()

function solveDay13() {
	const earliestBus = findEarliestBus()
	const earliestTimestamp = findEarliestTimestamp()
}

function findEarliestBus() {

	const busLinesDelays = busLines.filter((entry) => entry !== 'x').reduce((acc, busLine) => {
		acc.push({
			id: busLine,
			delay: busLine - earliestTimestamp % busLine
		})
		return acc
	}, [])

	return busLinesDelays.filter((line) => line.delay === Math.min(...busLinesDelays.reduce((acc, elem) => {
		acc.push(elem.delay)
		return acc
	}, [])))[0]
}

// Try to implement chinese rests theorem as I know it works as a solution.
// Theorem tested here with my dataset : https://www.dcode.fr/restes-chinois
function findEarliestTimestamp() {

	// Find congruences
	let busCounter = 0
	const restsAndMods = busLines.reduce((acc, busLine) => {
		if(busLine !== 'x') {
			let id = parseInt(busLine)
			timestamp = parseInt(busCounter)
			acc.push({
				rest: timestamp === 0 ? 0 : (id - timestamp),
				mod: id
			})
		}

		busCounter++
		return acc
	}, [])

	console.log('Congruences: ', restsAndMods, '\n')

	// Find moduli product
	const modProd = restsAndMods.reduce((acc, mod) => {
		return acc *= mod.mod
	}, 1)
	console.log('Moduli product: ', modProd, '\n')

	// Find partial results
	console.log('Partial results:')
	let result = 0
	for(let i = 0; i < restsAndMods.length; i++) {
		let entry = restsAndMods[i]
		let n = entry.rest
		let m = (modProd / entry.mod)
		let y = modInverse(m, entry.mod)

		console.log('M', i, ': ', m, '	y', i, ': ', y)

		// Adding each product of results found to final result
		result += n * m * y
	}
	console.log('\nFound: ', result, '\n')

	result %= modProd
	console.log('First timestamp: ', result) // this should print 1058443396696792 but does not and I don't know why :(

	return result
}

function modInverse(a, b) {
	a %= b;
    for (var x = 1; x < b; x++) {
        if ((a*x)%b == 1) {
            return x;
        }
    }
}