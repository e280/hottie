
import http from "node:http"
import {WebSocketServer} from "ws"

import {Options} from "./types.js"
import {listen} from "./parts/listen.js"

export async function serveWebsocket(options: Options) {
	const server = http.createServer()
	const wss = new WebSocketServer({server})

	await listen(server, options.wsPort)

	return {
		sendReload() {
			for (const client of wss.clients)
				if (client.readyState === client.OPEN)
					client.send("reload")
		},
	}
}

