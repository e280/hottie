
import http from "node:http"
import {Middleware} from "../types.js"

export function chain(...middlewares: (Middleware | undefined)[]): http.RequestListener {
	middlewares = middlewares.filter(Boolean)

	return async (req, res) => {
		let i = 0

		const next = async(): Promise<void> => {
			const middleware = middlewares[i++]
			if (middleware)
				await middleware(req, res, next)
		}

		try {
			await next()
		}
		catch (error) {
			console.error("middleware error", error)
			if (!res.headersSent) {
				res.writeHead(500, {"content-type": "text/plain; charset=utf-8"})
				res.end("500 internal server error")
			}
			else if (!res.writableEnded) {
				res.end()
			}
		}
	}
}

