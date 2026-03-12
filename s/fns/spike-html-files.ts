
import fs from "node:fs/promises"

import {logHtml} from "./log/html.js"
import {logFile} from "./log/file.js"
import {script} from "./parts/script.js"
import {Middleware, Options} from "./types.js"
import {injectScript} from "./parts/inject-script.js"
import {resolveHtmlPath} from "./parts/resolve-html-path.js"

export const spikeHtmlFiles = (options: Options): Middleware => async(req, res, next) => {
	const url = new URL(req.url ?? "/", "http://localhost")
	const pathname = decodeURIComponent(url.pathname)
	const htmlPath = resolveHtmlPath(options.root, pathname)

	if (htmlPath) try {
		const html = await fs.readFile(htmlPath, "utf8")
		logHtml(req.url)
		const body = injectScript(html, script())
		res.statusCode = 200
		res.setHeader("content-type", "text/html; charset=utf-8")
		res.setHeader("content-length", Buffer.byteLength(body))
		res.end(body)
		return
	} catch {}

	logFile(req.url)
	await next()
}

