#!/usr/bin/env node

import {serve} from "./serve.js"
import {arg, cli, command, number, param, string} from "@benev/argv"

await cli(process.argv, {
	name: "spark",
	help: "tiny hot-reloading http server",
	commands: command({
		args: [
			arg("root").default(string, "x", {help: "directory to serve"}),
		],
		params: {
			port: param.default(number, "8080", {help: "http port"}),
			debounce: param.default(number, "100", {help: "file watcher hesitation in milliseconds"}),
			proxy: param.optional(string, {help: "fallback url to proxy requests to for 404s"}),
			"ws-port": param.default(number, "8079", {help: "web socket port"}),
		},

		async execute({args, params}) {
			const {root} = args
			const {port, debounce, proxy} = params
			const wsPort = params["ws-port"]

			await serve({root, port, wsPort, debounce, proxy})
		},
	}),
}).execute()

