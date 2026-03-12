
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"

export const logFile = (url?: string) => console.log([

	pipe("file")
		.to(color.blue)
		.done(),

	pipe(url ?? "")
		.to(color.blue)
		.to(color.dim)
		.done(),

].join(" "))

