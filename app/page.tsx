"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

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
      .then(() => alert("URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy URL: ", err))
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">URL-Encoded Todo List</h1>
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
      <Button onClick={copyUrl}>Copy URL</Button>
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

