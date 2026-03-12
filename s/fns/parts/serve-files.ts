
import {logFile} from "../log/file.js"
import {Middleware} from "../types.js"

export const logFiles: Middleware = async(req, _res, next) => {
	logFile(req.url)
	await next()
}

