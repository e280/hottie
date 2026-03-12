
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"

export const logIntro = (options: {
		root: string
		port: number
	}) => {

	console.log([
		"⚡",

		pipe("spark")
			.to(color.brightYellow)
			.to(color.bold)
			.done(),

		pipe(options.root)
			.to(color.yellow)
			.to(color.dim)
			.done(),
	].join(" "))

	console.log(
		pipe(`https://localhost:${options.port}/`)
			.to(color.cyan)
			.done(),
	)

	console.log("")
}

