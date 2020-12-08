const fs = require('fs')

solveDay8('day08/input.txt')

function solveDay8(filePath) {
	const instructions = fs.readFileSync(filePath,'utf8').split('\n')
	const formattedInstructions = getFormattedInstructions(instructions)

	console.log(getAccumulatorValue(formattedInstructions))
}

function getFormattedInstructions(instructions) {
	const instructionRegex = /^(?<operation>nop|acc|jmp) (?<argument>(\+|-)([0-9])+)$/

	return instructions.reduce((instructionAccumulator, instruction) => {
		const instructionGroups = instruction.match(instructionRegex).groups

		const formattedInstruction = {
			operation: instructionGroups.operation,
			argument: parseInt(instructionGroups.argument),
			alreadyExecuted: false
		}

		instructionAccumulator.push(formattedInstruction)
		return instructionAccumulator
	}, [])
}

function getAccumulatorValue(instructions) {
	let accumulator = 0

	let i = 0
	while(i < instructions.length) {
		let instruction = instructions[i]
		let alreadyExecuted = instruction.alreadyExecuted

		if(alreadyExecuted) {
			break
		} else {
			instruction.alreadyExecuted = true
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

	return accumulator
}
