import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
	return (
		<main className="max-w-md mx-auto mt-20 p-4 font-sans text-center">
			<div className="flex flex-col items-center gap-6">
				<AlertCircle className="h-16 w-16 text-gray-400" />
				<h1 className="text-3xl font-bold tracking-wide">Page Not Found</h1>
				<p className="text-gray-600 mb-4">
					The page you're looking for doesn't exist.
				</p>
				<Button asChild className="mt-2">
					<Link href="/">Create a new list</Link>
				</Button>
			</div>
		</main>
	)
} 