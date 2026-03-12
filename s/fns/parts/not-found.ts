
import {logNope} from "../log/nope.js"
import {Middleware} from "../types.js"

export function notFound(): Middleware {
	return async(req, res) => {
		logNope(req.url)
		res.writeHead(404, {"content-type": "text/plain; charset=utf-8"})
		res.end("404 not found")
	}
}

