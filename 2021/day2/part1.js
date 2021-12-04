const fs = require('fs').promises

if (process.argv.length !== 3) {
	console.log(`Usage: node ${process.argv[1]} <inputFile>`)
	process.exit(0)
}

const [, , fileName] = process.argv

fs.readFile(fileName)
	.then(data => data.toString().split(/\r?\n/))
	.then(puzzle)
	.then(console.log)
	.catch(console.error)

const ACTIONS = {
	forward: (state, arg) => ({ ...state, horizontal: state.horizontal + arg }),
	up: (state, arg) => ({ ...state, depth: state.depth - arg }),
	down: (state, arg) => ({ ...state, depth: state.depth + arg })
}

function defaultAction(state) {
	return { ...state }
}

function getAction(name) {
	const action = ACTIONS[name]
	return action === undefined ? defaultAction : action
}

function puzzle(data) {
	const baseState = {
		horizontal: 0,
		depth: 0
	}

	const finalState = data
		.map(line => line.split(" "))
		.map(([actionName, arg]) => [getAction(actionName), Number(arg)])
		.reduce((acc, [action, arg]) => action(acc, arg), baseState)

	return finalState.horizontal * finalState.depth
}