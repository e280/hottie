
import path from "node:path"
import fs from "node:fs/promises"
import {color} from "@benev/argv"
import {RequestListener as L} from "node:http"
import {script} from "./script.js"

export const spike = (root: string, wsPort: number, listener: L): L => async(req, res) => {
	const url = new URL(req.url ?? "/", "http://localhost")
	const pathname = decodeURIComponent(url.pathname)
	const htmlPath = resolveHtmlPath(root, pathname)

	if (htmlPath) {
		console.log(`${color.green("html")}   ${req.url}`)
		const html = await fs.readFile(htmlPath, "utf8")
		const body = injectScript(html, script(wsPort))
		res.statusCode = 200
		res.setHeader("content-type", "text/html; charset=utf-8")
		res.setHeader("content-length", Buffer.byteLength(body))
		res.end(body)
		return
	}

	console.log(`${color.blue("static")} ${req.url}`)
	return listener(req, res)
}

function resolveHtmlPath(root: string, pathname: string) {
	if (pathname.endsWith("/"))
		pathname = pathname + "index.html"

	pathname = path.normalize(path.join(root, "." + pathname))

	if (!path.resolve(pathname).startsWith(path.resolve(root)))
		return null

	if ([".html", ".htm"].includes(path.extname(pathname)))
		return pathname

	return null
}

function injectScript(html: string, script: string) {
	return html.includes("</body>")
		? html.replace("</body>", `${script}\n</body>`)
		: html + "\n" + script
}

