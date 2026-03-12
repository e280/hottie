
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"

export const logReload = (count: number) => console.log("\n" + [

	"⚡",

	pipe("reload")
		.to(color.brightMagenta)
		.done(),

	pipe(`${count}`)
		.to(color.magenta)
		.to(color.dim)
		.done(),

].join(" "))

