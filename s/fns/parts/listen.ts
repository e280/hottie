
import http from "node:http"

export async function listen(port: number, server: http.Server) {
	return new Promise((resolve, reject) => {
		server.once("listening", resolve)
		server.on("error", reject)
		server.listen(port)
	})
}

