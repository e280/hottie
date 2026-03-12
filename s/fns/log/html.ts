
import {pipe} from "@e280/stz"
import {color} from "@benev/argv"

export const logHtml = (url?: string) => console.log([

	pipe("html")
		.to(color.green)
		.done(),

	url,

].join(" "))

