const fs = require('fs')

let validBags = new Set()

solveDay7('day07/input.txt')

function solveDay7(filePath) {

	const rules = fs.readFileSync(filePath,'utf8').split('\n')

	const formattedRules = getFormattedRules(rules)

	const searchedColor = 'shiny gold'

	console.log(countBagsColorsContainingBagColor(formattedRules, searchedColor))
}

function getFormattedRules(rules) {
	const ruleRegex = /^(?<bagColor>(\w+ )+)bags contain (?<innerBags>(((?<quantity>[0-9]+) (?<color>(\w+ )+))bags?(, )*)+|(?<noContent>no other bags))/
	const contentRegex =/((?<quantity>[0-9]+) (?<color>(\w+ )+)bags?)/

	return rules.reduce((ruleAccumulator, rule) => {
		const ruleGroups = rule.match(ruleRegex).groups

		const formattedRule = {
			bagColor: ruleGroups.bagColor.trim(),
			innerBags: ruleGroups?.innerBags?.split(', ')?.reduce((contentAccumulator, innerBags) => {
				const contentGroups = innerBags?.match(contentRegex)?.groups

				if(contentGroups) {
					const formattedContent = {
						quantity: contentGroups.quantity,
						bagColor: contentGroups.color.trim()
					}

					contentAccumulator.push(formattedContent)
				}
				return contentAccumulator
			}, []),
		}

		ruleAccumulator.push(formattedRule)
		return ruleAccumulator
	}, [])
}

function countBagsColorsContainingBagColor(rules, color) {

	const rulesLength = rules.length

	let i = 0

	while (i < rulesLength) {

		findValidBags(rules, rules[i], rules[i], color)

		i++
	}

	return [validBags.size]
}

function findValidBags(rules, currentBag, topLevelParent, color) {
	const bag = rules.find(el => el.bagColor === currentBag.bagColor)
	const innerBags = bag.innerBags
	const innerBagsColors = innerBags?.map(el => el.bagColor)

	if(!innerBags) {
		return
	}

	if(innerBagsColors.includes(color)) {
		validBags.add(topLevelParent.bagColor)
		return
	}

	let i = 0
	while(i < innerBags.length) {
		findValidBags(rules, innerBags[i], topLevelParent, color)
		i++
	}
}