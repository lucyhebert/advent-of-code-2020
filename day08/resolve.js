const fs = require('fs')

solveDay8('day08/input.txt')

function solveDay8(filePath) {
	const instructions = fs.readFileSync(filePath,'utf8').split('\n')
	let formattedInstructions = getFormattedInstructions(instructions)

	console.log(getAccumulatorValue(formattedInstructions)[0])

	console.log(findWrongInstruction(instructions))
}

function getFormattedInstructions(instructions) {
	const instructionRegex = /^(?<operation>nop|acc|jmp) (?<argument>(\+|-)([0-9])+)$/

	return instructions.reduce((instructionAccumulator, instruction) => {
		const instructionGroups = instruction.match(instructionRegex).groups

		const formattedInstruction = {
			operation: instructionGroups.operation,
			argument: parseInt(instructionGroups.argument)
		}

		instructionAccumulator.push(formattedInstruction)
		return instructionAccumulator
	}, [])
}

function getAccumulatorValue(instructions) {
	let accumulator = 0
	let alreadyExecuted = []

	let i = 0
	while(i < instructions.length) {
		let instruction = instructions[i]

		if(alreadyExecuted.includes(i)) {
			break
		} else {
			alreadyExecuted.push(i)
		}

		let operation = instruction.operation
		let argument = instruction.argument

		if(operation === 'acc') {
			accumulator += argument
			i++
		} else if(operation === 'jmp') {
			i += argument
		} else if(operation === 'nop') {
			i++
		}
	}

	return [accumulator, i]
}

function findWrongInstruction(instructions) {
	let accumulator = 0
	let updatedInstructions = getFormattedInstructions(instructions)

	let i = 0
	while(i < instructions.length) {
		let instruction = updatedInstructions[i]
		let originalOperation = instruction.operation

		if(originalOperation === 'nop' || originalOperation === 'jmp') {
			if(originalOperation === 'nop') {
				instruction.operation = 'jmp'
			} else if(originalOperation === 'jmp') {
				instruction.operation = 'nop'
			}

			let testUpdate = getAccumulatorValue(updatedInstructions)
			if(testUpdate[1] ===  instructions.length) {
				accumulator = testUpdate[0]
				break
			} else {
				instruction.operation = originalOperation
			}
		}
		i++
	}

	return accumulator
}
