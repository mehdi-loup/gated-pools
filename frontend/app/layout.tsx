import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChainGate DEX - Gated Cross-Chain Liquidity Pools",
  description: "Private, low-fee swapping environment for DAOs and foundations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="chaingate">
      <body className={inter.className}>
        <div className="min-h-screen bg-base-100">{children}</div>
      </body>
    </html>
  )
}
