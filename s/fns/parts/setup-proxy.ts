
import {Middleware} from "../types.js"
import {createProxyServer} from "http-proxy-3"

export function setupProxy(target: string) {
	const server = createProxyServer()
	const middleware: Middleware = async(req, res) => server.web(req, res, {target})
	return {server, middleware}
}

