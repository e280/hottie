
import sirv from "sirv"
import http from "node:http"
import {WebSocketServer} from "ws"

import {Options} from "./types.js"
import {chain} from "./parts/chain.js"
import {listen} from "./parts/listen.js"
import {notFound} from "./parts/not-found.js"
import {setupProxy} from "./parts/setup-proxy.js"
import {spikeHtmlFiles} from "./spike-html-files.js"

export async function serveHttp(options: Options, wss: WebSocketServer) {
	const proxy = options.proxy
		? setupProxy(options.proxy)
		: undefined

	const server = http.createServer(chain(
		options.nope
			? undefined
			: spikeHtmlFiles(options),
		sirv(options.root, {dev: true}),
		proxy?.middleware ?? notFound(),
	))

	server.on("upgrade", (req, socket, head) => {
		if (req.url === "/e280-spark-ws") {
			wss.handleUpgrade(req, socket, head, ws => wss.emit("connection", ws, req))
			return
		}

		if (proxy)
			return proxy.server.ws(req, socket, head)

		socket.destroy()
	})

	await listen(options.port, server)
}

