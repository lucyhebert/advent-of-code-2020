const fs = require('fs')

solveDay5('day05/input.txt')

function solveDay5(filePath) {

	const seats = fs.readFileSync(filePath,'utf8').split('\n')

	console.log(findHighestSeatID(seats))
	console.log(findMissingSeatNumber(seats))
}

function findHighestSeatID(seats) {

	const seatsLength = seats.length

	let maxSeatId = 0
	let i = 0

	while (i < seatsLength) {
		let seat = seats[i]
		let seatId = getSeatId(seat)

		if(seatId > maxSeatId) {
			maxSeatId = seatId
		}

		i++
	}

	return maxSeatId
}

function findMissingSeatNumber(seats) {
	const seatsIds = getAllSeatsIds(seats)

	let missingSeatNumbers = 0
	let i = 0

	while(i < seatsIds.length - 1) {
		if(seatsIds[i + 1] !== seatsIds[i] + 1) {
			missingSeatNumbers = seatsIds[i] + 1
			break
		}

		i++
	}

	return missingSeatNumbers
}

function getAllSeatsIds(seats) {

	const seatsLength = seats.length

	let seatsIds = []

	let i = 0

	while (i < seatsLength) {
		let seat = seats[i]
		let seatId = getSeatId(seat)

		seatsIds.push(seatId)

		i++
	}

	return seatsIds.sort((a, b) => a - b)
}

function getSeatId(seat) {
	const rowCoordinates = seat.substr(0, 7)
	const columnCoordinates = seat.substr(7)

	let rowNumber = getNumberFromCoordinates(rowCoordinates, 'row')
	let columnNumber = getNumberFromCoordinates(columnCoordinates, 'column')

	return calculateSeatId(rowNumber, columnNumber)
}

function getNumberFromCoordinates(coordinates, type) {
	let min = 0
	let max = 0
	let lowCoordinate
	let highCoordinate
	let number = 0

	if(type === 'row') {
		max = 127
		lowCoordinate = 'F'
		highCoordinate = 'B'
	} else if(type === 'column') {
		max = 7
		lowCoordinate = 'L'
		highCoordinate = 'R'
	}

	let i = 0

	while(i < coordinates.length) {
		let coordinate = coordinates[i]

		if(coordinate === lowCoordinate) {
			max = Math.floor(min + ((max - min) / 2))
		} else if(coordinate === highCoordinate) {
			min = Math.ceil(min + ((max - min) / 2))
		}

		i++
	}

	if(min === max) {
		number = min
	}

	return number
}

function calculateSeatId(rowNumber, columnNumber) {
	return rowNumber * 8 + columnNumber
}
