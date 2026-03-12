
export function injectScript(html: string, script: string) {
	return html.includes("</body>")
		? html.replace("</body>", `${script}\n</body>`)
		: html + "\n" + script
}

