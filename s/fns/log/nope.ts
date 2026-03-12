
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"

export const logNope = (url?: string) => console.log([

	pipe("nope")
		.to(color.red)
		.done(),

	pipe(url ?? "")
		.to(color.red)
		.to(color.dim)
		.done(),

].join(" "))

