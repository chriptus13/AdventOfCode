const fs = require('fs').promises

if (process.argv.length !== 3) {
	console.log(`Usage: node ${process.argv[1]} <inputFile>`)
	process.exit(0)
}

const [, , fileName] = Array.prototype.slice.call(process.argv)

fs.readFile(fileName)
	.then(data => data.toString().split(/\r?\n/).map(Number))
	.then(puzzle)
	.then(console.log)
	.catch(console.error)

function puzzle(data) {
	return data
		.filter((curr, i, arr) => i !== 0 && curr > arr[i - 1])
		.length
}