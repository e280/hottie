
import http from "node:http"

export async function listen(server: http.Server, port: number) {
	return new Promise((resolve, reject) => {
		server.once("listening", resolve)
		server.on("error", reject)
		server.listen(port)
	})
}

