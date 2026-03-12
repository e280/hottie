
import http from "node:http"

export type Options = {
	root: string
	port: number
	debounce: number
	proxy: string | undefined
	cold: boolean
}

export type Middleware = (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	next: () => Promise<void>,
) => void | Promise<void>

