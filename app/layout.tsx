import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import Script from "next/script"
import Footer from "@/components/Footer"
import ServiceWorkerRegistration from "@/components/serviceWorkerRegistration"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "urltodo",
  description: "A todo list app that encodes tasks in the URL",
}

const darkBlueInkColour = "#19214f"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#19214f" />
        <link rel="apple-touch-icon" href="/icons/manifest-icon-192.maskable.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="urltodo" />
        <Script
          async
          defer
          data-website-id="9dd87958-0c31-4f40-80cf-df8b2d036bc2"
          src="https://cloud.umami.is/script.js"
        />
      </head>
      <body className={inter.className + " bg-linen"} >
        <ServiceWorkerRegistration />
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
        <Toaster
          toastOptions={{
            style: {color: darkBlueInkColour}
          }}
        />
      </body>
    </html>
  )
}



import './globals.css'