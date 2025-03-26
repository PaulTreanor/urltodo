"use client"
import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { Copy } from "@/components/icons/Copy"
import logoSvg from "@/components/icons/logo.svg"
import Image from "next/image"

import TypewriterEditableTitle from "@/components/list-title"
import { copyCurrentWindowUrl } from "@/lib/windowUtils"
import { encodeTasks, decodeTasks } from "@/lib/encodingUtils"
import type { Task } from "@/types/types"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [listTitle, setListTitle] = useState("")

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const { tasks: decodedTasks, title } = decodeTasks(hash)
      setTasks(decodedTasks)
      if (title) {
        setListTitle(title)
      }
    }
  }, [])

  useEffect(() => {
    const encodedData = encodeTasks(tasks, listTitle)
    window.history.replaceState(null, "", `#${encodedData}`)
  }, [tasks, listTitle])

  useEffect(() => {
    document.title = listTitle ? `${listTitle} | urltodo` : "urltodo"
  }, [listTitle])

  const handleTitleChange = (newTitle: string) => {
    setListTitle(newTitle)
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask.trim(),
          completed: false
        }
      ])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <main className="max-w-md mx-auto mt-8 p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
				<div className="relative">
           <Image 
             src={logoSvg} 
             alt="URL Todo Logo" 
             width={165} 
             height={44} 
             className="-ml-3 mt-1"
           />
				</div>
        <Button 
          variant="outline" 
          onClick={copyCurrentWindowUrl}
          className="px-3 flex items-center gap-1.5 text-dark-blue-ink bg-white border-stone-400 hover:bg-stone-200 hover:text-dark-blue-ink hover:border-stone-500 transition-colors"
        >
          <Copy width={30} height={30} />
          {/* <ClipboardCopy width={30} height={30} /> */}
          <span className="text-base">Copy URL</span>
        </Button>
      </div>
      <TypewriterEditableTitle 
        title={listTitle} 
        onTitleChange={handleTitleChange} 
      />
      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow bg-white focus-visible:ring-spring-moss placeholder:text-dusty-purple"
        />
        <Button className="text-base bg-dark-blue-ink hover:bg-dusty-purple" type="submit">Add</Button>
      </form>
      <ul className="space-y-2 mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-dark-blue-ink">
            <Checkbox 
              id={task.id} 
              checked={task.completed} 
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1 data-[state=checked]:bg-dark-blue-ink data-[state=checked]:border-dark-blue-ink border-dark-blue-ink" 
            />
            <label 
              htmlFor={task.id} 
              className={`overflow-hidden break-words ${task.completed ? "line-through text-neutral-500" : ""}`}
            >
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

