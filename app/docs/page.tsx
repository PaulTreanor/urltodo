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

			<h1 className="text-3xl font-bold text-[#19214F] mb-6">urltodo</h1>
			
			<section className="mb-8">
				<p className="mb-4 text-[#19214F]">
          urltodo is the easiest way to share a list.
        </p>
        
        <p className="mb-4 text-[#19214F]">
        Just go to <a href="https://urltodo.com" className="text-blue-500">urltodo.com</a>, create your list, and then copy the url.
				</p>
				
				<h3 className="text-xl font-semibold text-[#19214F] mt-6 mb-3">The link is the list</h3>
				<p className="mb-4 text-[#19214F]">
        This is possible because the list items are encoded *in* the url. This gives urltodo lists some interesing properties: 
				</p>
				<p className="mb-4 text-[#19214F]">
        The list items are encoded *in* the URl. 
        There's no accounts. 
        There's no servers storing data. 
        You can bookmark you lists, or embed them in docs or websites <a className="text-blue-500" href="https://www.urltodo.com/#eyJ0YXNrcyI6W3siaWQiOiIxNzQxOTkwNTU2OTgyIiwidGV4dCI6IlRoaXMgaXMgZnVuIiwiY29tcGxldGVkIjp0cnVlfV0sInRpdGxlIjoiSGVsbG8ifQ==">like this</a>.
        Lists don't get deleted so long as you have the URL, and every change you make is versioned in your browser history. 
        You can programatically create urltodo todo lists with simple scripts
				</p>

      <p className="mb-4 text-[#19214F]">
        There is obviously tons of ways to use urltodo but here's some ideas. 
				</p>
				
				<ol className="list-disc pl-6 space-y-1 text-[#19214F]">
					<li>Share shopping lists</li>
					<li>Plan parties/trips/festivals</li>
					<li>Checklists (like a morning routine)</li>
					<li>Generate lists links from other resources (code)</li>
        </ol>
        
				<p className="mb-4 text-[#19214F] mt-6">
        I like to keep a list I'm working on open in my browser window, even if I turn my phone on and off the state of my list will persist. 
				</p>

      </section>
      
      <section className="mb-8">
      <h3 className="text-xl font-semibold text-[#19214F] mt-6 mb-3">Limitations </h3>
      <p className="mb-4 text-[#19214F]">
      There is an upward limit to the length of lists imposted by Chrome and FireFox's max URL lengths (32,000 and 64,000 characters). In practice these would be very long lists. 
			</p>
	
      </section>
      
      <section className="mb-8">
      <h3 className="text-xl font-semibold text-[#19214F] mt-6 mb-3">Links</h3>
				<ol className="list-disc pl-6 space-y-1 text-[#19214F]">
					<li><a href="https://github.com/PaulTreanor/urltodo" className="text-blue-500">GitHub Repo</a></li>
					<li><a href="https://paultreanor.com" className="text-blue-500">My website</a></li>
				</ol>
	
			</section>
		</main>
	)
} 