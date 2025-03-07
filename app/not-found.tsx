import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
	return (
		<main className="max-w-md mx-auto mt-20 p-4 font-sans text-center">
			<div className="flex flex-col items-center gap-6">
				<AlertCircle className="h-16 w-16 text-[#19214F]" />
				<h1 className="text-3xl font-bold tracking-wide text-[#19214F]">Page Not Found</h1>
				<p className="text-[#19214F] mb-4">
					The page you're looking for doesn't exist.
				</p>
				<Button asChild className="mt-2 bg-[#19214F] hover:bg-[#6B7299]">
					<Link href="/">Create a new list</Link>
				</Button>
			</div>
		</main>
	)
} 