const fs = require('fs')

const filePath = 'day11/input.txt'
const grid = fs.readFileSync(filePath,'utf8').split('\n')
const gridWidth = grid[0].length
const gridHeight = grid.length

solveDay11()

function solveDay11() {
	console.log(countFinalOccupiedSeats(grid))
	console.log(countFinalOccupiedSeats(grid, true))
}

function countFinalOccupiedSeats(grid, visibility = false) {
	let occupiedSeatsCounter = 0
	let changesCounter = 0
	let continueLooping = true

	while(continueLooping) {
		let result = countOccupiedSeats(grid, visibility)
		continueLooping = result.continueLooping
		grid = [...result.newGrid]
	}

	let result = grid.reduce((acc, line) => {
		acc.push(line.split('').filter((x) => x === '#'))
		return acc
	}, []).flat().length

	return result
}

function countOccupiedSeats(grid, visibility) {
	let occupiedSeatsCounter = 0
	let changesCounter = 0
	let newGrid = []

	for(let i = 0; i < gridHeight; i++) {
		let line = grid[i]
		let newLine = ''

		for(let j = 0; j < gridWidth; j++) {
			let place = grid[i][j]
			let isFloorPlace = isFloor(place)

			if(!isFloorPlace && isFree(place, i, j, grid, visibility)) {
				// console.log('visible occupied seats for position ', i, j, countVisibleOccupiedSeats(place, i, j, grid))
				// console.log('switch to #')
				newLine += '#'
				changesCounter++
				occupiedSeatsCounter++
			} else if(!isFloorPlace && isReleasable(place, i, j, grid, visibility)) {
				// console.log('visible occupied seats for position ', i, j, countVisibleOccupiedSeats(place, i, j, grid))
				// console.log('switch to L')
				newLine += 'L'
				changesCounter++
				occupiedSeatsCounter--
			} else {
				// console.log('no change for position', i, j)
				// console.log('keep', place)
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
	return place === '#'
}

function isEmpty(place) {
	return place === 'L'
}

function isFree(place, i, j, grid, visibility) {
	return isEmpty(place)
		&& (visibility ? countVisibleOccupiedSeats(place, i, j, grid) === 0 : countAdjacentOccupiedSeats(place, i, j, grid) === 0)
}

function isReleasable(place, i, j, grid, visibility) {
	return isOccupied(place)
		&& (visibility ? countVisibleOccupiedSeats(place, i, j, grid) >= 5 : countAdjacentOccupiedSeats(place, i, j, grid) >= 4)
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

function countVisibleOccupiedSeats(place, i, j, grid) {
	let occupiedSeatsCounter = 0
	const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

	for(let k = 0; k < directions.length; k++) {
		let direction = directions[k]
		let seatOnDirection = hasOccupiedSeatOnDirection(direction, place, i, j, grid)
		occupiedSeatsCounter += seatOnDirection
	}

	return occupiedSeatsCounter
}

function hasOccupiedSeatOnDirection(direction, place, i, j, grid) {
	switch(direction) {
		case 'N':
			return findOccupiedSeatOnNorth(place, i, j, grid)
			break
		case 'NE':
			return findOccupiedSeatOnNorthEast(place, i, j, grid)
			break
		case 'E':
			return findOccupiedSeatOnEast(place, i, j, grid)
			break
		case 'SE':
			return findOccupiedSeatOnSouthEast(place, i, j, grid)
			break
		case 'S':
			return findOccupiedSeatOnSouth(place, i, j, grid)
			break
		case 'SW':
			return findOccupiedSeatOnSouthWest(place, i, j, grid)
			break
		case 'W':
			return findOccupiedSeatOnWest(place, i, j, grid)
			break
		case 'NW':
			return findOccupiedSeatOnNorthWest(place, i, j, grid)
			break
	}
}

function findOccupiedSeatOnNorth(place, i, j, grid) {
	if(i === 0) {
		return 0
	}

	for(let y = i - 1; y >= 0 ; y--) {
		let line = grid[y]
		let adjacentPlace = line[j]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
	}

	return 0
}

function findOccupiedSeatOnNorthEast(place, i, j, grid) {
	if(i === 0 || j === gridWidth - 1) {
		return 0
	}

	let x = j + 1

	for(let y = i - 1; y >= 0; y--) {
		let line = grid[y]
		let adjacentPlace = line[x]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}

		x++
	}

	return 0
}

function findOccupiedSeatOnEast(place, i, j, grid) {
	if(j === gridWidth - 1) {
		return 0
	}

	for(let x = j + 1; x < gridWidth; x++) {
		let line = grid[i]
		let adjacentPlace = line[x]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
	}

	return 0
}

function findOccupiedSeatOnSouthEast(place, i, j, grid) {
	if(i === gridHeight - 1 || j === gridWidth - 1) {
		return 0
	}

	let x = j + 1

	for(let y = i + 1; y < gridHeight && x < gridWidth; y++) {
		let line = grid[y]
		let adjacentPlace = line[x]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
		x++
	}

	return 0
}

function findOccupiedSeatOnSouth(place, i, j, grid) {
	if(i === gridHeight - 1) {
		return 0
	}

	for(let y = i + 1; y < gridHeight; y++) {
		let line = grid[y]
		let adjacentPlace = line[j]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
	}

	return 0
}

function findOccupiedSeatOnSouthWest(place, i, j, grid) {
	if(i === gridHeight - 1 || j === 0) {
		return 0
	}

	let x = j - 1

	for(let y = i + 1; y < gridHeight && x >= 0; y++) {
		let line = grid[y]
		let adjacentPlace = line[x]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
		x--
	}

	return 0
}

function findOccupiedSeatOnWest(place, i, j, grid) {
	if(j === 0) {
		return 0
	}

	for(let x = j - 1; x >= 0; x--) {
		let line = grid[i]
		let adjacentPlace = line[x]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
	}

	return 0
}

function findOccupiedSeatOnNorthWest(place, i, j, grid) {
	if(i === 0 || j === 0) {
		return 0
	}

	let x = j - 1

	for(let y = i - 1; y >= 0 && x >= 0; y--) {
		let line = grid[y]
		let adjacentPlace = line[x]

		if(isEmpty(adjacentPlace)) {
			return 0
		}

		if(isOccupied(adjacentPlace)) {
			return 1
		}
		x--
	}

	return 0
}