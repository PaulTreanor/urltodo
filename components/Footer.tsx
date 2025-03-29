"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
	const pathname = usePathname()
	
	return (
		<footer className="w-full mx-auto p-4 pr-12 mt-12">
			<div className="w-full flex justify-end text-sm text-dusty-purple">
				<div className="flex gap-6">
					{pathname !== "/docs" && (
						<Link href="/docs" className="hover:text-dark-blue-ink transition-colors">
							Documentation
						</Link>
					)}
				</div>
			</div>
		</footer>
	)
} 