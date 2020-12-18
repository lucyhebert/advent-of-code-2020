const fs = require('fs')

const filePath = 'day14/input.txt'
const blocks = fs.readFileSync(filePath,'utf8').split('mask = ').filter((x) => x !== '')
const parameterRegex= /mem\[(?<memoryLocation>\d+)\] = (?<param>\d+)/

const program = blocks.reduce((acc, block) => {
	acc.push({
		mask: block.slice(0),
		parameters: parseParameters(block)
	})
	return acc
}, [])

solveDay14()

function parseParameters(block) {
	return block.split('\n').slice(1).filter((x) => x !== '').reduce((acc, param) => {
		let parameterGroups = param.match(parameterRegex).groups

		acc.push({
			memoryLocation: parameterGroups.memoryLocation,
			param: parameterGroups.param,
			binaryParam: numberToBits36(parseInt(parameterGroups.param))
		})

		return acc
	}, [])
}

function solveDay14() {
	console.log(sumMemoryValues())
}

function sumMemoryValues() {
	let memory = []

	for(let i = 0; i < program.length; i++) {
		let block = program[i]
		let mask = block.mask
		let parameters = block.parameters

		for(let j = 0; j < parameters.length; j++) {
			let parameter = parameters[j]
			memory[parameter.memoryLocation] = applyMask(mask, parameter.binaryParam)
		}
	}

	return memory.reduce((acc, value) => {
		acc += parseInt(bits36ToNumber(value))
		return acc
	}, 0)
}

function numberToBits36(number) {
	const bits = [...baseConvert(number, 10, 2)]

	let result = bits

	while(result.length < 36) {
		result.splice(0, 0, '0')
	}

	return result.join('')
}

function bits36ToNumber(bits) {
	let shortenedBits = [...bits]

	for(let i = 0; i < 36; i++) {
		if(bits[i] === '1') {
			break
		}
		if(bits[i] === '0') {
			shortenedBits.splice(0, 1)
		}
	}

	return baseConvert(shortenedBits.join(''), 2, 10)
}

function baseConvert(number, from, to) {
	return parseInt(number + ' ', from).toString(to)
}

function applyMask(mask, parameter) {
	let result = [...parameter]

	for(let i = 0; i < mask.length; i++) {
		if(mask[i] !== parameter[i] && mask[i] !== 'X') {
			result[i] = mask[i]
		}
	}

	return result.join('')
}