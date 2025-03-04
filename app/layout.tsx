import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vynnox Rzy - Digital Marketing Solutions",
  description: "Nín hǎo, huānyíng lái dào vynnox Rzy wǎng shàng shāngdiàn",
    generator: '𒐬 | デ 𝐕𝐲𝐧𝐧𝐨𝐱 𝐑𝐳𝐲'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'