import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { NavBar } from "@/components/nav"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Lucia Starterkit",
  description: "When simplicity meets robust library",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <Toaster
          position="top-center"
          richColors
        />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
