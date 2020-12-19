const fs = require('fs')
const _ = require('lodash');

const filePath = 'day16/input.txt'
const rulesGroups = fs.readFileSync(filePath,'utf8').split('\n\n',)

const rules = rulesGroups[0].split('\n').reduce((acc, rule) => {
	let field = rule.match(/\w+/)[0]
	let ranges = [...rule.matchAll(/\d+-\d+/g)]

	acc.push({
		field: field,
		ranges: ranges.reduce((acc, range) => {
			let groups = range[0].split('-')
			acc.push({
				min: groups[0],
				max: groups[1]
			})

			return acc
		}, []),

	})

	return acc
}, [])

rulesGroups[1].split('\n').splice(0, 1)
const ticket = rulesGroups[1].match(/(\d+(,\d+)+)/)[1].split(',')

rulesGroups[2].split('\n').splice(0, 1)
const nearbyTickets = [...rulesGroups[2].matchAll(/(\d+(,\d+)+)/g)].map(x => x[0].split(','))

solveDay16()

function solveDay16() {
	console.log(getTicketErrorRate())
}

function getTicketErrorRate(index) {
	let invalidValues = []
	const flattenedRanges = rules.map(x => x.ranges).flat()
	const flattenedNearbyTickets = nearbyTickets.flat()

	for(let i = 0; i < flattenedNearbyTickets.length; i++) {
		let isValid = false
		let value = parseInt(flattenedNearbyTickets[i])

		for(let j = 0; j < flattenedRanges.length; j++) {
			let range = flattenedRanges[j]

			if(value >= parseInt(range.min) && value <= parseInt(range.max)) {
				isValid = true
				break
			}
		}

		if(!isValid) {
			invalidValues.push(value)
		}
	}

	return invalidValues.reduce((a, b) => a + b)
}