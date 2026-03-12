
import sirv from "sirv"
import http from "node:http"
import chokidar from "chokidar"
import {color} from "@benev/argv"
import {WebSocketServer} from "ws"
import {debounce, pipe} from "@e280/stz"
import {spike} from "./spike.js"

export function serve(options: {
		root: string
		port: number
		wsPort: number
	}) {

	const httpServer = http.createServer(
		spike(
			options.root,
			options.wsPort,
			sirv(options.root, {dev: true}),
		)
	)

	const wsServer = http.createServer()
	const wss = new WebSocketServer({server: wsServer})
	let count = 1

	chokidar.watch(options.root).on("change", debounce(100, () => {
		console.log(`\n⚡ ${
			pipe("reload")
				.to(color.brightYellow)
				.to(color.bold)
				.done()
		} ${count++}`)
		for (const client of wss.clients)
			client.send("reload")
	}))

	httpServer.listen(options.port)
	wsServer.listen(options.wsPort)

	console.log([
		`⚡`,
		pipe("spark")
			.to(color.brightYellow)
			.to(color.bold)
			.done(),
		pipe(options.root)
			.to(color.yellow)
			.to(color.dim)
			.done(),
		pipe(`--port ${options.port}`)
			.to(color.blue)
			.to(color.dim)
			.done(),
		pipe(`--ws-port ${options.wsPort}`)
			.to(color.blue)
			.to(color.dim)
			.done(),
	].join(" "))

	console.log([
		pipe(`https://localhost:${options.port}/`)
			.to(color.cyan)
			.done(),
	].join(" "))

	console.log("")
}

