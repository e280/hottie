
import {templateString as html} from "@e280/stz"
import {wsPath} from "./ws-path.js"

export const script = () => html`
	<script type="module">
		const protocol = location.protocol === "https:" ? "wss:" : "ws:"
		const socket = new WebSocket(protocol + "//" + location.host + "${wsPath}")
		const events = {
			message: () => location.reload(),
			open: () => console.log("💅 hottie hot-reload connected"),
			close: () => console.log("🔥 hottie hot-reload connection closed"),
			error: () => console.log("🔥 hottie hot-reload connection failed"),
		}
		for (const [event, fn] of Object.entries(events))
			socket.addEventListener(event, fn)
	</script>
`

