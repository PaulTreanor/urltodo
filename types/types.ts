type Task = {
  // Using Date.now().toString() to create id when task is created
  id: string 
  text: string
  completed: boolean
}

export type { Task }