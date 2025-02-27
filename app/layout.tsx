import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "urltodo",
  description: "A todo list app that encodes tasks in the URL",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="9dd87958-0c31-4f40-80cf-df8b2d036bc2"
          src="https://cloud.umami.is/script.js"
          // Or use strategy="beforeInteractive" or "afterInteractive" if needed
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'