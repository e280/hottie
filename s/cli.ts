#!/usr/bin/env node

import {serve} from "./serve.js"
import {arg, cli, command, number, param, string} from "@benev/argv"

await cli(process.argv, {
	name: "hottie",
	readme: "https://github.com/e280/hottie",
	help: "tiny hot-reloading http server.",
	commands: command({
		args: [
			arg("root").default(string, "x", {help: "directory to serve"}),
		],
		params: {
			port: param.default(number, "8080", {
				help: "http port.",
			}),
			debounce: param.default(number, "100", {
				help: "file watcher hesitation in milliseconds.",
			}),
			proxy: param.optional(string, {
				help: "requests fallback to this proxy url.",
			}),
			cold: param.flag("-c", {
				help: "actually don't do the hot-reloading, just be a server.",
			}),
		},

		async execute({args, params}) {
			const {root} = args
			await serve({root, ...params})
		},
	}),
}).execute()

