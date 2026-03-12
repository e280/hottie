
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"

export const logReload = (count: number) => console.log("\n" + [

	"⚡",

	pipe("reload")
		.to(color.brightYellow)
		.to(color.bold)
		.done(),

	count,

].join(" "))

