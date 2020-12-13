const fs = require('fs')

const filePath = 'day11/input.txt'
const grid = fs.readFileSync(filePath,'utf8').split('\n')
const gridWidth = grid[0].length
const gridHeight = grid.length

solveDay11()

function solveDay11() {

	console.log(countFinalOccupiedSeats(grid))
}

function countFinalOccupiedSeats(grid) {
	let occupiedSeatsCounter = 0
	let changesCounter = 0
	let continueLooping = true

	while(continueLooping) {
		let result = countOccupiedSeats(grid)
		continueLooping = result.continueLooping
		grid = [...result.newGrid]
	}

	let result = grid.reduce((acc, line) => {
		acc.push(line.split('').filter((x) => x === '#'))
		return acc
	}, []).flat().length

	return result
}

function countOccupiedSeats(grid) {
	let occupiedSeatsCounter = 0
	let changesCounter = 0
	let newGrid = []

	for(let i = 0; i < gridHeight; i++) {
		let line = grid[i]
		let newLine = ''

		for(let j = 0; j < gridWidth; j++) {
			let place = grid[i][j]

			if(isFree(place, i, j, grid)) {
				newLine += '#'
				changesCounter++
				occupiedSeatsCounter++
			} else if(isReleasable(place, i, j, grid)) {
				newLine += 'L'
				changesCounter++
				occupiedSeatsCounter--
			} else {
				newLine += place
			}
		}
		
		newGrid.push(newLine)
	}

	return {
		continueLooping: changesCounter > 0,
		newGrid: newGrid
	}
}

function isFloor(place) {
	return place === '.'
}

function isOccupied(place) {
	return place ==='#'
}

function isEmpty(place) {
	return place === 'L'
}

function isFree(place, i, j, grid) {
	return isEmpty(place)
		&& (countAdjacentOccupiedSeats(place, i, j, grid) === 0)
}

function isReleasable(place, i, j, grid) {
	return isOccupied(place)
		&& countAdjacentOccupiedSeats(place, i, j, grid) >= 4
}

function countAdjacentOccupiedSeats(place, i, j, grid) {
	let occupiedSeatsCounter = 0

	for(let y = i > 0 ? i - 1 : 0; (y < i + 2) && (y < gridHeight); y++) {
		let line = grid[y]
		for(let x = j > 0 ? j - 1 : 0; x < (j + 2) && (x < gridWidth); x++) {
			if((i !== y && j !== x) || (i === y && j !== x) || (i !== y && j === x)) {
				let adjacentPlace = line[x]
				if(isOccupied(adjacentPlace)) {
					occupiedSeatsCounter++
				}
			}
		}
	}

	return occupiedSeatsCounter
}