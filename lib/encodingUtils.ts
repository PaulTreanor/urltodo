import type { Task } from "@/types/types"

function encodeTasks(tasks: Task[]): string {
	const jsonString = JSON.stringify(tasks);
	
  // b64 can't handle emojies but encodeURIComponent can
  // While escape/unescape are deprecated, this combination reliably handles
  // all Unicode characters while keeping the encoded string relatively compact
  // compared to just encodeURIComponent and btoa
	return btoa(unescape(encodeURIComponent(jsonString)));
}
  
function decodeTasks(encoded: string): Task[] {
	try {
		// Reverse of encoding process
		const jsonString = decodeURIComponent(escape(atob(encoded)));
		return JSON.parse(jsonString);
	} catch {
		return []
	}
}

export {
	encodeTasks,
	decodeTasks
}