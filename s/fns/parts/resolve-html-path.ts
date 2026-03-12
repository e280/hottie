
import path from "node:path"

export function resolveHtmlPath(root: string, pathname: string) {
	if (pathname.endsWith("/"))
		pathname = pathname + "index.html"

	pathname = path.normalize(path.join(root, "." + pathname))

	if (!path.resolve(pathname).startsWith(path.resolve(root)))
		return null

	if ([".html", ".htm"].includes(path.extname(pathname)))
		return pathname

	return null
}

