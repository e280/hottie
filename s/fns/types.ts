
import http from "node:http"

export type Options = {
	root: string
	port: number
	wsPort: number
	debounce: number
	proxy: string | undefined
}

export type Middleware = (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	next: () => Promise<void>,
) => void | Promise<void>

