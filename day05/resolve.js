const fs = require('fs')

solveDay5('day05/input.txt')

function solveDay5(filePath) {

	const seats = fs.readFileSync(filePath,'utf8').split('\n')

	console.log(findHighestSeatID(seats))
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

function getSeatId(seat) {
	const rowCoordinates = seat.substr(0, 7)
	const columnCoordinates = seat.substr(7)

	let rowNumber = getRowNumber(rowCoordinates)
	let columnNumber = getColumnNumber(columnCoordinates)

	return calculateSeatId(rowNumber, columnNumber)
}

function getRowNumber(rowCoordinates) {
	let minRow = 0
	let maxRow = 127
	let rowNumber = 0

	let i = 0

	while(i < rowCoordinates.length) {
		let rowCoordinate = rowCoordinates[i]

		if(rowCoordinate === 'F') {
			maxRow = Math.floor(minRow + ((maxRow - minRow) / 2))
		} else if(rowCoordinate === 'B') {
			minRow = Math.ceil(minRow + ((maxRow - minRow) / 2))
		}

		i++
	}

	if(minRow === maxRow) {
		rowNumber = minRow
	}

	return rowNumber
}

function getColumnNumber(columnCoordinates) {
	i = 0

	let minColumn = 0
	let maxColumn = 7
	let columnNumber = 0

	while(i <= columnCoordinates.length) {
		let columnCoordinate = columnCoordinates[i]

		if(columnCoordinate === 'L') {
			maxColumn = Math.floor(minColumn + ((maxColumn - minColumn) / 2))
		} else if(columnCoordinate === 'R') {
			minColumn = Math.ceil(minColumn + ((maxColumn - minColumn) / 2))
		}

		i++
	}

	if(minColumn === maxColumn) {
		columnNumber = minColumn
	}

	return columnNumber
}

function calculateSeatId(rowNumber, columnNumber) {
	return rowNumber * 8 + columnNumber
}
