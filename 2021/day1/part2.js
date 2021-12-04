const fs = require('fs').promises

if (process.argv.length !== 3) {
	console.log(`Usage: node ${process.argv[1]} <inputFile>`)
	process.exit(0)
}

const [, , fileName] = process.argv

fs.readFile(fileName)
	.then(data => data.toString().split(/\r?\n/).map(Number))
	.then(puzzle)
	.then(console.log)
	.catch(console.error)

const STEP = 3

Array.prototype.sum = function () {
	return this.reduce((acc, curr) => acc + curr, 0)
}

function puzzle(data) {
	return data
		.map((_, idx, arr) => arr.slice(idx, idx + STEP).sum())
		.filter((curr, idx, arr) => idx !== 0 && curr > arr[idx - 1])
		.length
}