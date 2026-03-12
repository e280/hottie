
import sirv from "sirv"
import http from "node:http"
import chokidar from "chokidar"
import {debounce} from "@e280/stz"
import {WebSocketServer} from "ws"

import {logIntro} from "./fns/log/intro.js"
import {logReload} from "./fns/log/reload.js"
import {spikeHtmlFiles} from "./fns/spike-html-files.js"

export function serve(options: {
		root: string
		port: number
		wsPort: number
	}) {

	const httpServer = http.createServer(
		spikeHtmlFiles(
			options.root,
			options.wsPort,
			sirv(options.root, {dev: true}),
		)
	)

	let count = 1
	const wsServer = http.createServer()
	const wss = new WebSocketServer({server: wsServer})

	chokidar.watch(options.root, {ignoreInitial: true})
		.on("all", debounce(100, () => {
			logReload(count++)
			for (const client of wss.clients)
				if (client.readyState === client.OPEN)
					client.send("reload")
		}))

	httpServer.listen(options.port)
	wsServer.listen(options.wsPort)

	logIntro(options)
	console.log("")
}

