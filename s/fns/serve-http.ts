
import sirv from "sirv"
import http from "node:http"

import {Options} from "./types.js"
import {chain} from "./parts/chain.js"
import {listen} from "./parts/listen.js"
import {spikeHtmlFiles} from "./spike-html-files.js"

export async function serveHttp(options: Options) {
	const server = http.createServer(chain(
		spikeHtmlFiles(options),
		sirv(options.root, {dev: true}),
	))

	await listen(server, options.port)
}

