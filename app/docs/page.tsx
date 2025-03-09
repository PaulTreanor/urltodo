"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default function DocsPage() {
	return (
		<main className="max-w-3xl mx-auto mt-8 p-4 font-sans">
			<div className="mb-6">
				<Link href="/">
					<Button variant="ghost" className="flex items-center gap-2 pl-0 hover:bg-transparent">
						<ArrowLeft size={16} />
						<span>Back to App</span>
					</Button>
				</Link>
			</div>

			<h1 className="text-3xl font-bold text-[#19214F] mb-6">URL Todo Documentation</h1>
			
			<section className="mb-8">
				<h2 className="text-2xl font-semibold text-[#19214F] mb-4">How It Works</h2>
				<p className="mb-4 text-[#19214F]">
					URL Todo stores your tasks directly in the URL hash, making it easy to share and bookmark your todo lists.
					No server, no database, just a URL that contains all your tasks.
				</p>
				
				<h3 className="text-xl font-semibold text-[#19214F] mt-6 mb-3">URL Encoding</h3>
				<p className="mb-4 text-[#19214F]">
					Tasks are encoded using base64 and stored in the URL hash. Here's how the encoding works:
				</p>
				
				<div className="mb-6">
					<SyntaxHighlighter language="typescript" style={vs2015} customStyle={{
						borderRadius: '0.5rem',
						padding: '1.5rem',
					}}>
{`// Encoding tasks to URL
const encodeTasks = (tasks, title) => {
  const data = { tasks, title };
  const jsonString = JSON.stringify(data);
  return btoa(jsonString);
};

// Decoding tasks from URL
const decodeTasks = (encodedData) => {
  try {
    const jsonString = atob(encodedData);
    return JSON.parse(jsonString);
  } catch (error) {
    return { tasks: [], title: "" };
  }
};`}
					</SyntaxHighlighter>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold text-[#19214F] mb-4">Features</h2>
				
				<ul className="list-disc pl-6 space-y-2 text-[#19214F]">
					<li>Create and manage todo lists without an account</li>
					<li>Share lists via URL</li>
					<li>Bookmark lists for later</li>
					<li>Custom list titles</li>
					<li>Mark tasks as complete</li>
					<li>Delete tasks</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-semibold text-[#19214F] mb-4">Usage Examples</h2>
				
				<h3 className="text-xl font-semibold text-[#19214F] mt-6 mb-3">Creating a List</h3>
				<p className="mb-4 text-[#19214F]">
					Simply add tasks using the input field and click "Add". The URL will automatically update.
				</p>
				
				<h3 className="text-xl font-semibold text-[#19214F] mt-6 mb-3">Sharing a List</h3>
				<p className="mb-4 text-[#19214F]">
					Click the "Copy URL" button and share the link with anyone you want.
				</p>
				
				<SyntaxHighlighter language="javascript" style={vs2015} customStyle={{
					borderRadius: '0.5rem',
					padding: '1.5rem',
				}}>
{`// Example of how to programmatically copy the URL
const copyCurrentWindowUrl = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      // Show success message
    })
    .catch((err) => {
      console.error('Failed to copy URL: ', err);
    });
};`}
				</SyntaxHighlighter>
			</section>
		</main>
	)
} 