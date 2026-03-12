
import chokidar from "chokidar"
import {debounce} from "@e280/stz"

import {Options} from "./fns/types.js"
import {logIntro} from "./fns/log/intro.js"
import {logReload} from "./fns/log/reload.js"
import {serveHttp} from "./fns/serve-http.js"
import {serveWebsocket} from "./fns/serve-websocket.js"

export async function serve(options: Options) {
	await serveHttp(options)
	const {sendReload} = await serveWebsocket(options)

	let count = 1
	chokidar.watch(options.root, {ignoreInitial: true})
		.on("all", debounce(100, () => {
			logReload(count++)
			sendReload()
		}))

	logIntro(options)
}

