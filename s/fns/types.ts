
import http from "node:http"

export type Options = {
	root: string
	port: number
	wsPort: number
}

export type Middleware = (
	req: http.IncomingMessage,
	res: http.ServerResponse,
	next: () => Promise<void>,
) => void | Promise<void>

