'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { sepolia, } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import { injected, metaMask, safe } from 'wagmi/connectors'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { BlockieAvatar } from '@/components/BlockieAvatar'
import { ProofProvider } from '@vlayer/react'
import { proverConfig } from '@/hooks/vlayer/helpers'

const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={BlockieAvatar}
        >
          <ProofProvider config={proverConfig}>
            {children}
          </ProofProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
} 