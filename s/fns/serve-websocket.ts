
import {WebSocketServer} from "ws"

export function serveWebsocket() {
	const wss = new WebSocketServer({noServer: true})

	return {
		wss,
		sendReload() {
			for (const client of wss.clients)
				if (client.readyState === client.OPEN)
					client.send("reload")
		},
	}
}

