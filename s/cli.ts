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
			"ws-port": param.default(number, "8079", {help: "web socket port"}),
		},

		async execute({args, params}) {
			const {root} = args
			const {port} = params
			const wsPort = params["ws-port"]

			serve({root, port, wsPort})

		},
	}),
}).execute()

