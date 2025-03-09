import React from "react"
import Link from "next/link"

export default function Footer() {
	return (
		<footer className="w-full mx-auto p-4 pr-12 mt-12">
			<div className="w-full flex justify-end text-sm text-[#6B7299]">
				<div className="flex gap-6">
					<Link href="/docs" className="hover:text-[#19214F] transition-colors">
						Documentation
					</Link>
				</div>
			</div>
		</footer>
	)
} 