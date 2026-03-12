
import sirv from "sirv"
import http from "node:http"
import {WebSocketServer} from "ws"

import {Options} from "./types.js"
import {chain} from "./parts/chain.js"
import {listen} from "./parts/listen.js"
import {wsPath} from "./parts/ws-path.js"
import {notFound} from "./parts/not-found.js"
import {logFiles} from "./parts/serve-files.js"
import {setupProxy} from "./parts/setup-proxy.js"
import {spikeHtmlFiles} from "./spike-html-files.js"

export async function serveHttp(options: Options, wss: WebSocketServer) {
	const proxy = options.proxy
		? setupProxy(options.proxy)
		: undefined

	const server = http.createServer(chain(
		options.cold
			? undefined
			: spikeHtmlFiles(options),
		logFiles,
		sirv(options.root, {dev: true}),
		proxy?.middleware ?? notFound(),
	))

	server.on("upgrade", (req, socket, head) => {
		if (req.url === wsPath) {
			wss.handleUpgrade(req, socket, head, ws => wss.emit("connection", ws, req))
			return
		}

		if (proxy)
			return proxy.server.ws(req, socket, head)

		socket.destroy()
	})

	await listen(options.port, server)
}

