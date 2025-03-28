"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Copy } from "@/components/icons/Copy"
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

      <div className="flex items-center gap-4 mb-6">
	      <Copy width={40} height={40} />
	      <h1 className="text-3xl font-bold text-dark-blue-ink">urltodo</h1>
      </div>
			<section className="mb-8">
				<p className="mb-4 text-dark-blue-ink">
        urltodo stores your list entirely in the URL. When you edit the list the URL changes. If you share the URL other people can see the same list. <strong>The link is the list.</strong>
        </p>
        
        <p className="mb-4 text-dark-blue-ink">
        Just go to <a href="https://urltodo.com" className="text-ghibli-sky">urltodo.com</a>, create your list, and then copy the url.
				</p>
				
				<p className="mb-4 text-dark-blue-ink">
          There's no accounts and no servers. You can bookmark your lists or embed them in a document <a className="text-ghibli-sky" href="eyJ0YXNrcyI6W3siaWQiOiIxNzQzMTk3NzgxMzk5IiwidGV4dCI6IlNoYXJlIHNob3BwaW5nIGxpc3RzIiwiY29tcGxldGVkIjpmYWxzZX0seyJpZCI6IjE3NDMxOTc3ODQ5NDEiLCJ0ZXh0IjoiUGxhbiBwYXJ0aWVzL3RyaXBzL2Zlc3RpdmFscyIsImNvbXBsZXRlZCI6ZmFsc2V9LHsiaWQiOiIxNzQzMTk3Nzg4MTY0IiwidGV4dCI6IkNoZWNrbGlzdHMgKGxpa2UgYSBtb3JuaW5nIHJvdXRpbmUpIiwiY29tcGxldGVkIjpmYWxzZX0seyJpZCI6IjE3NDMxOTc3OTI5MzkiLCJ0ZXh0IjoiR2VuZXJhdGUgbGlzdHMgbGlua3MgZnJvbSBvdGhlciByZXNvdXJjZXMgKGNvZGUpIiwiY29tcGxldGVkIjpmYWxzZX1dLCJ0aXRsZSI6IldoYXQgdG8gdXNlIHVybHRvZG8gZm9yPyJ9"> like this</a>. Lists never get deleted and every change you make is versioned in your browser history.
				</p>

      </section>
      
      <section className="mb-8">
      <h3 className="text-xl font-semibold text-dark-blue-ink mt-6 mb-3">Limitations </h3>
      <p className="mb-4 text-dark-blue-ink">
      There is an upward limit to the length of lists imposted by Chrome and FireFox's max URL lengths (32,000 and 64,000 characters). In practice these would be very long lists. 
			</p>
	
      </section>
      
      <section className="mb-8">
      <h3 className="text-xl font-semibold text-dark-blue-ink mt-6 mb-3">Links</h3>
				<ol className="list-disc pl-6 space-y-1 text-dark-blue-ink">
					<li><a href="https://github.com/PaulTreanor/urltodo" className="text-ghibli-sky">GitHub Repo</a></li>
					<li><a href="https://paultreanor.com" className="text-ghibli-sky">My website</a></li>
				</ol>
	
			</section>
		</main>
	)
} 