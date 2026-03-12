
import chokidar from "chokidar"
import {debounce} from "@e280/stz"
import {Options} from "./types.js"

export function onChange(options: Options, fn: () => void) {
	chokidar.watch(options.root, {ignoreInitial: true})
		.on("all", debounce(options.debounce, fn))
}

