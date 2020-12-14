const fs = require('fs')

const filePath = 'day12/input.txt'
const instructionRegex = /(?<action>N|S|E|W|L|R|F)(?<step>\d+)/
const instructions = fs.readFileSync(filePath,'utf8').split('\n').reduce((acc, instruction) => {
	let match = instruction.match(instructionRegex)
	acc.push({
		action: match.groups.action,
		step: match.groups.step
	})
	return acc
}, [])

const directions = ['N', 'E', 'S', 'W']

solveDay12()

function solveDay12() {
	console.log(getManhattanDistance(instructions))
}

function getManhattanDistance(instructions) {
	const finalPosition = findFinalPosition(instructions)
	const finalPositionWithWaypoint = findFinalPositionWithWaypoint(instructions)
	return [
		Math.abs(finalPosition.x) + Math.abs(finalPosition.y),
		Math.abs(finalPositionWithWaypoint.x) + Math.abs(finalPositionWithWaypoint.y)
	]
}

function findFinalPosition(instructions) {
	let position = {
		x: 0,
		y: 0
	}

	const directions = ['N', 'E', 'S', 'W']
	let currentDirectionIndex = 1

	function moveForward(direction, step) {
		switch(direction) {
			case 'N':
				position.y -= step
				break
			case 'S':
				position.y += step
				break
			case 'E':
				position.x += step
				break
			case 'W':
				position.x -= step
				break
		}
	}

	function changeDirection(direction, degrees) {
		let step = degrees / 90

		if(direction === 'L') {
			currentDirectionIndex = (currentDirectionIndex + 4 - step) % 4
		}
		if(direction === 'R') {
			currentDirectionIndex = (currentDirectionIndex + step) % 4
		}
	}

	for(let i = 0; i < instructions.length; i++) {
		let instruction = instructions[i]
		let action = instruction.action
		let step = parseInt(instruction.step)

		switch(action) {
			case 'N':
			case 'S':
			case 'E':
			case 'W':
				moveForward(action, step)
				break
			case 'L':
			case 'R':
				changeDirection(action, step)
				break
			case 'F':
				moveForward(directions[currentDirectionIndex], step)
				break
		}
	}

	return position
}

function findFinalPositionWithWaypoint(instructions) {
	let shipPosition = {
		x: 0,
		y: 0
	}

	let waypointPosition = {
		x: 10,
		y: -1
	}

	let currentDirectionIndex = 1

	function moveWaypoint(direction, step) {
		switch(direction) {
			case 'N':
				waypointPosition.y -= step
				break
			case 'S':
				waypointPosition.y += step
				break
			case 'E':
				waypointPosition.x += step
				break
			case 'W':
				waypointPosition.x -= step
				break
		}
	}

	function rotateWaypoint(direction, degrees) {
		const step = degrees / 90

		if(step === 4) {
			return
		}

		for(let i = 1; i <= step; i++) {
			const initialXPosition = waypointPosition.x
			const initialYPosition = waypointPosition.y

			if(direction === 'L') {
				waypointPosition.x = initialYPosition
				waypointPosition.y = initialXPosition * -1
			}

			if(direction === 'R') {
				waypointPosition.x = initialYPosition * -1
				waypointPosition.y = initialXPosition
			}
		}
	}

	function moveForward(step) {
		shipPosition.x += step * waypointPosition.x
		shipPosition.y += step * waypointPosition.y
	}

	for(let i = 0; i < instructions.length; i++) {
		let instruction = instructions[i]
		let action = instruction.action
		let step = parseInt(instruction.step)

		switch(action) {
			case 'N':
			case 'S':
			case 'E':
			case 'W':
				moveWaypoint(action, step)
				break
			case 'L':
			case 'R':
				rotateWaypoint(action, step)
				break
			case 'F':
				moveForward(step)
				break
		}
	}

	return shipPosition
}