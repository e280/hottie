
import {templateString as html} from "@e280/stz"

export const script = () => html`
	<script type="module">
		const protocol = location.protocol === "https:" ? "wss:" : "ws:"
		const socket = new WebSocket(protocol + "//" + location.host + "/e280-spark-ws")
		const events = {
			message: () => location.reload(),
			open: () => console.log("⚡ spark hot-reload connected"),
			close: () => console.log("🔥 spark hot-reload connection closed"),
			error: () => console.log("🔥 spark hot-reload connection failed"),
		}
		for (const [event, fn] of Object.entries(events))
			socket.addEventListener(event, fn)
	</script>
`

