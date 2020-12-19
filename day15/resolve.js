const fs = require('fs')
const _ = require('lodash');

const filePath = 'day14/input.txt'
const blocks = fs.readFileSync(filePath,'utf8').split('mask = ').filter((x) => x !== '')
const parameterRegex= /mem\[(?<memoryLocation>\d+)\] = (?<param>\d+)/
const program = blocks.reduce((acc, block) => {
	let blockArray = block.split('\n')
	acc.push({
		mask: blockArray[0],
		parameters: parseParameters(blockArray)
	})
	return acc
}, [])

solveDay14()

function parseParameters(block) {
	return block.slice(1).filter((x) => x !== '').reduce((acc, param) => {
		let parameterGroups = param.match(parameterRegex).groups

		acc.push({
			memoryLocation: parameterGroups.memoryLocation,
			binaryMemoryLocation: numberToBits36(parseInt(parameterGroups.memoryLocation)),
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
	let memoryV1 = {}
	let memoryV2 = {}

	for(let i = 0; i < program.length; i++) {
		let block = program[i]
		let mask = block.mask
		let parameters = block.parameters

		for(let j = 0; j < parameters.length; j++) {
			let parameter = parameters[j]

			memoryV1[parameter.memoryLocation] = applyMaskOnValue(mask, parameter.binaryParam)

			let maskedLocation = applyMaskOnMemomyLocation(mask, parameter.binaryMemoryLocation)
			let newMemoryLocations = applyFloatOnMemoryLocation(mask, [maskedLocation])

			for(let k = 0; k < newMemoryLocations.length; k++) {
				memoryV2[bits36ToNumber(newMemoryLocations[k])] = parameter.param
			}
		}
	}

	return [
		Object.values(memoryV1).reduce((acc, value) => {
			acc += parseInt(bits36ToNumber(value))
			return acc
		}, 0),
		Object.values(memoryV2).reduce((acc, value) => {
			acc += parseInt(value)
			return acc
		}, 0)
	] // => [ 2346881602152, 3885232834169 ]
}

function numberToBits36(number) {
	return baseConvert(number, 10, 2).padStart(36, '0')
}

function bits36ToNumber(bits) {
	return baseConvert([...bits].join(''), 2, 10)
}

function baseConvert(number, from, to) {
	return parseInt(number + ' ', from).toString(to)
}

function applyMaskOnValue(mask, parameter) {
	let result = [...parameter]

	for(let i = 0; i < mask.length; i++) {
		if(mask[i] !== parameter[i] && mask[i] !== 'X') {
			result[i] = mask[i]
		}
	}

	return result.join('')
}

function applyMaskOnMemomyLocation(mask, location) {
	let result = [...location].slice(0)

	for(let j = 0; j < mask.length; j++) {
		let currentMask = mask[j]

		if(currentMask === '1' || currentMask === 'X' ) {
			result[j] = currentMask
		}
	}

	return result
}

function applyFloatOnMemoryLocation(mask, maskedLocations) {
	let result = []

	for(let i = 0; i < maskedLocations.length; i++) {
		let maskedLocation = maskedLocations[i]
		let floatIndex = maskedLocation.indexOf('X')

		if(floatIndex === -1) {
			return maskedLocations
		}

		let a = maskedLocation.slice(0, floatIndex).concat('0', maskedLocation.slice(floatIndex + 1))
		let b = maskedLocation.slice(0, floatIndex).concat('1', maskedLocation.slice(floatIndex + 1))

		result.push(a, b);
	}

	return applyFloatOnMemoryLocation(mask, result)
}