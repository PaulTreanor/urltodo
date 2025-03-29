"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Copy } from "@/components/icons/Copy"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function DocsPage() {
	return (
		<main className="max-w-3xl mx-auto mt-8 p-4 font-sans">
			<div className="mb-6">
				<Link href="/">
					<Button variant="ghost" className="flex items-center gap-2 pl-0 hover:bg-transparent text-dark-blue-ink">
						<ArrowLeft size={16} />
						<span>Back to App</span>
					</Button>
				</Link>
			</div>

      <div className="flex items-center gap-4 mb-6">
	      <Copy width={40} height={40} />
	      <h1 className="text-3xl font-bold text-dark-blue-ink">urltodo</h1>
      </div>
			<section className="mb-8">
				<p className="mb-4 text-dark-blue-ink">
        urltodo stores your list entirely in the URL. When you edit the list the URL changes. If you share the URL other people can see the same list. <strong>The link is the list.</strong>
        </p>
        
        <p className="mb-4 text-dark-blue-ink">
        Just go to <Link href="https://urltodo.com" className="text-ghibli-sky">urltodo.com</Link>, create your list, and then copy the url.
				</p>
				
				<p className="mb-4 text-dark-blue-ink">
          There's no accounts and no servers. You can bookmark your lists or embed them in a document <Link className="text-ghibli-sky" href="https://urltodo.com/#eyJ0YXNrcyI6W3siaWQiOiIxNzQzMTk3NzgxMzk5IiwidGV4dCI6IlNoYXJlIHNob3BwaW5nIGxpc3RzIiwiY29tcGxldGVkIjpmYWxzZX0seyJpZCI6IjE3NDMxOTc3ODQ5NDEiLCJ0ZXh0IjoiUGxhbiBwYXJ0aWVzL3RyaXBzL2Zlc3RpdmFscyIsImNvbXBsZXRlZCI6ZmFsc2V9LHsiaWQiOiIxNzQzMTk3Nzg4MTY0IiwidGV4dCI6IkNoZWNrbGlzdHMgKGxpa2UgYSBtb3JuaW5nIHJvdXRpbmUpIiwiY29tcGxldGVkIjpmYWxzZX0seyJpZCI6IjE3NDMxOTc3OTI5MzkiLCJ0ZXh0IjoiR2VuZXJhdGUgbGlzdHMgbGlua3MgZnJvbSBvdGhlciByZXNvdXJjZXMgKGNvZGUpIiwiY29tcGxldGVkIjpmYWxzZX1dLCJ0aXRsZSI6IldoYXQgdG8gdXNlIHVybHRvZG8gZm9yPyJ9"> like this</Link>. Lists never get deleted and every change you make is versioned in your browser history.
				</p>

      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-dark-blue-ink mt-6 mb-3">Creating URL Encoded Todo Lists with scripting and urltodo</h3>
        <p className="mb-4 text-dark-blue-ink">
          You can programmatically create URLs that can be opened as lists in urltodo.com. You just need to create a valid TodoList JSON object and encode it correctly into a valid urltodo URL.
        </p>

        <h4 className="text-lg font-semibold text-dark-blue-ink mt-6 mb-3">JSON Schema</h4>
        <SyntaxHighlighter language="typescript" style={atomOneLight} className="rounded-md mb-4">
{`interface TodoList {
	title?: string;       // Optional list title
	tasks: Task[];          
}

interface Task {
	id: string;           // Unique Id (recommended: Date.now().toString)
	text: string;         // Task content
	completed: boolean;   // Task completion status
}`}
        </SyntaxHighlighter>

        <h4 className="text-lg font-semibold text-dark-blue-ink mt-6 mb-3">Encoding process</h4>
        <p className="mb-4 text-dark-blue-ink">
          URLTodo encodes a todo list into a URL using the following encoding chain:
        </p>
        <p className="mb-4 text-dark-blue-ink font-mono bg-slate-100 p-2 rounded">
          JSON.stringify → encodeURIComponent → unescape → btoa
        </p>
        <p className="mb-4 text-dark-blue-ink">
          Each step in this chain serves a specific purpose:
        </p>
        <ol className="list-decimal pl-6 space-y-1 mb-4 text-dark-blue-ink">
          <li><code className="font-mono">encodeURIComponent</code> converts all unicode characters into UTF-8 sequences. Without this step the URL would not be able to contain special characters like emojis.</li>
          <li><code className="font-mono">unescape</code> converts all percent-encoded sequences (%XX) back to their actual byte values. For ASCII characters, this just returns the original character. For special Unicode characters like emojis, it converts the percent-encoded UTF-8 byte sequences into raw UTF-8 bytes (not percent-encodings). Without this step the final encoding would be far longer (unless your list items are entirely emojis...)</li>
          <li><code className="font-mono">btoa</code> encodes everything as a base64 string which makes it URL safe and shortens the string considerably.</li>
        </ol>
        <p className="mb-4 text-dark-blue-ink">
          Note: <code className="font-mono">unescape</code> is a deprecated function but it is supported in all browsers and JavaScript run times.
        </p>

        <h4 className="text-lg font-semibold text-dark-blue-ink mt-6 mb-3">Implementation examples</h4>
        
        <h5 className="text-md font-semibold text-dark-blue-ink mt-4 mb-2">JavaScript</h5>
        <SyntaxHighlighter language="javascript" style={atomOneLight} className="rounded-md mb-4">
{`const groceryList = [
	"Milk",
	"Eggs",
	"Bread",
	"Bananas 🍌",
	"Coffee ☕",
	"Chicken",
	"Rice",
	"Tomatoes 🍅"
];

// Create a urltodo-compatible data structure
function createTodoData(items) {
	const tasks = items.map(item => ({
		id: Date.now().toString,
		text: item,
		completed: false
	}));
	
	return {
		title: "Weekly Groceries",
		tasks: tasks
	};
}

// Encode the data for urltodo
function encodeForUrlTodo(data) {
	const jsonString = JSON.stringify(data);
	return btoa(unescape(encodeURIComponent(jsonString)));
}

// Generate the full URL
function generateTodoUrl(encodedData) {
	return \`https://urltodo.com/#\${encodedData}\`;
}

const todoData = createTodoData(groceryList);
const encodedData = encodeForUrlTodo(todoData);
const todoUrl = generateTodoUrl(encodedData);

console.log(todoUrl);`}
        </SyntaxHighlighter>

        <h5 className="text-md font-semibold text-dark-blue-ink mt-4 mb-2">Python</h5>
        <SyntaxHighlighter language="python" style={atomOneLight} className="rounded-md mb-4">
{`import json
import base64

def encode_for_urltodo(data):
    """Encode data for URLTodo app using Python"""
    # Step 1: Convert to JSON string (equivalent to JSON.stringify)
    json_str = json.dumps(data)
    
    # Steps 2-3: Instead of encodeURIComponent + unescape, 
    # we directly encode the string to UTF-8 bytes
    utf8_bytes = json_str.encode('utf-8')
    
    # Step 4: Base64 encode (equivalent to btoa)
    base64_bytes = base64.b64encode(utf8_bytes)
    
    # Convert back to string for URL usage
    base64_str = base64_bytes.decode('ascii')
    
    return base64_str

# Example usage
todo_data = {
    "title": "Python Shopping List",
    "tasks": [
        {
            "id": "1743242653576",
            "text": "Apples 🍎",
            "completed": False
        },
        {
            "id": "1743242653913", 
            "text": "Bananas 🍌",
            "completed": True
        }
    ]
}

encoded_data = encode_for_urltodo(todo_data)
todo_url = f"https://urltodo.com/#{encoded_data}"

print(todo_url)`}
        </SyntaxHighlighter>
      </section>
      
      <section className="mb-8">
      <h3 className="text-xl font-semibold text-dark-blue-ink mt-6 mb-3">Limitations </h3>
      <p className="mb-4 text-dark-blue-ink">
      There is an upward limit to the length of lists imposed by Chrome and FireFox's max URL lengths (32,000 and 64,000 characters). In practice these would be very long lists. 
			</p>
	
      </section>
      
      <section className="mb-8">
      <h3 className="text-xl font-semibold text-dark-blue-ink mt-6 mb-3">Links</h3>
				<ol className="list-disc pl-6 space-y-1 text-dark-blue-ink">
					<li><Link href="https://github.com/PaulTreanor/urltodo" className="text-ghibli-sky">GitHub Repo</Link></li>
					<li><Link href="https://paultreanor.com" className="text-ghibli-sky">My website</Link></li>
				</ol>
	
			</section>
		</main>
	)
} 