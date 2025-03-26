import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
	return (
		<main className="max-w-md mx-auto mt-20 p-4 font-sans text-center">
			<div className="flex flex-col items-center gap-6">
				<AlertCircle className="h-16 w-16 text-dark-blue-ink" />
				<h1 className="text-3xl font-bold tracking-wide text-dark-blue-ink">Page Not Found</h1>
				<p className="text-dark-blue-ink mb-4">
					The page you're looking for doesn't exist.
				</p>
				<Button asChild className="mt-2 bg-dark-blue-ink hover:bg-dusty-purple">
					<Link href="/">Create a new list</Link>
				</Button>
			</div>
		</main>
	)
} 