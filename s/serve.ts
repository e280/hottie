
import {Options} from "./fns/types.js"
import {logIntro} from "./fns/log/intro.js"
import {onChange} from "./fns/on-change.js"
import {logReload} from "./fns/log/reload.js"
import {serveHttp} from "./fns/serve-http.js"
import {serveWebsocket} from "./fns/serve-websocket.js"

export async function serve(options: Options) {
	await serveHttp(options)
	const {sendReload} = await serveWebsocket(options)

	let count = 1
	onChange(options, () => {
		logReload(count++)
		sendReload()
	})

	logIntro(options)
}

