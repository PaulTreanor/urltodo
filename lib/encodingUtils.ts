import type { Task } from "@/types/types"

interface EncodedData {
	tasks: Task[];
	title?: string;
}

export function encodeTasks(tasks: Task[], title?: string): string {
	const data: EncodedData = { tasks }
	if (title && title !== 'Untitled List') {
		data.title = title
	}
	return btoa(JSON.stringify(data))
}

export function decodeTasks(encoded: string): EncodedData {
	try {
		const decoded = JSON.parse(atob(encoded))
		// Handle both new format (with title) and old format (just tasks array)
		if (Array.isArray(decoded)) {
			return { tasks: decoded }
		}
		return decoded
	} catch (error) {
		console.error("Failed to decode tasks:", error)
		return { tasks: [] }
	}
}