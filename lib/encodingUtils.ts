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
	const jsonString = JSON.stringify(data);
	
	// b64 can't handle emojies but encodeURIComponent can
	// While escape/unescape are deprecated, this combination reliably handles
	// all Unicode characters while keeping the encoded string relatively compact
	// compared to just encodeURIComponent and btoa
	return btoa(unescape(encodeURIComponent(jsonString)));
}

export function decodeTasks(encoded: string): EncodedData {
	try {
		// Reverse of encoding process
		const jsonString = decodeURIComponent(escape(atob(encoded)));
		const decoded = JSON.parse(jsonString);
		
		// Handle both new format (with title) and old format (just tasks array)
		if (Array.isArray(decoded)) {
			return { tasks: decoded }
		}
		return decoded;
	} catch (error) {
		console.error("Failed to decode tasks:", error)
		return { tasks: [] }
	}
}