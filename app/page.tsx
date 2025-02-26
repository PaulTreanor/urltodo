"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ClipboardCopy } from "lucide-react"
import { toast } from "sonner"

interface Task {
  id: string
  text: string
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const decodedTasks = decodeTasks(hash)
      setTasks(decodedTasks)
    }
  }, [])

  useEffect(() => {
    const encodedTasks = encodeTasks(tasks)
    window.history.replaceState(null, "", `#${encodedTasks}`)
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const copyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("URL copied to clipboard!", {
          duration: 1500,
        })
      })
      .catch((err) => console.error("Failed to copy URL: ", err))
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4 font-sans ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold tracking-wide italic">urltodo</h1>
        <Button 
          variant="outline" 
          onClick={copyUrl}
          className="px-3 flex items-center gap-1.5 text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <ClipboardCopy size={16} />
          <span className="text-sm font-normal">Copy URL</span>
        </Button>
      </div>
      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2 mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
            <label htmlFor={task.id} className={`flex-grow ${task.completed ? "line-through text-gray-500" : ""}`}>
              {task.text}
            </label>
            <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </main>
  )
}

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

