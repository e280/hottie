
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"
import {Options} from "../types.js"

export const logIntro = (options: Options) => {

	console.log([
		"💅",

		pipe("hottie")
			.to(color.brightMagenta)
			.to(color.bold)
			.done(),

		pipe(options.root)
			.to(color.magenta)
			.to(color.dim)
			.done(),
	].join(" "))

	console.log(
		pipe(`https://localhost:${options.port}/`)
			.to(color.cyan)
			.done(),
	)

	const info = options.cold
		? `tiny http server. (--cold disabled hot-reloading)`
		: `tiny hot-reloading http server.`

	console.log(
		pipe(info)
			.to(color.dim)
			.done(),
	)

	console.log("")
}

