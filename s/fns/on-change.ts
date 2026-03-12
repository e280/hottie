
import chokidar from "chokidar"
import {debounce} from "@e280/stz"
import {Options} from "./types.js"

// TODO we should really do an 'exclude' param with globby minimatch patterns...
const illegals = [
	"node_modules",
	".git",
	".DS_Store",
]

export function onChange(options: Options, fn: () => void) {
	const watcher = chokidar.watch(options.root, {
		ignoreInitial: true,
		ignored: file => illegals.some(illegal => file.includes(illegal)),
	})

	watcher.on("all", debounce(options.debounce, fn))
}

