import type { Task } from "@/types/types"

function encodeTasks(tasks: Task[]): string {
  return btoa(JSON.stringify(tasks))
}
  
function decodeTasks(encoded: string): Task[] {
  try {
    return JSON.parse(atob(encoded))
  } catch {
    return []
  }
}

export {
  encodeTasks,
  decodeTasks
}