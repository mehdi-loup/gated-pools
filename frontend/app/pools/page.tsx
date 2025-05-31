import Navbar from "@/components/navbar"
import { TrendingUp, Users, Lock, Zap } from "lucide-react"

export default function PoolsPage() {
  const pools = [
    {
      name: "Ethereum Foundation Pool",
      domain: "ethereum.org",
      token: "ETH",
      tvl: "$2.4M",
      volume24h: "$156K",
      members: 45,
      apy: "12.4%",
    },
    {
      name: "Uniswap Labs Pool",
      domain: "uniswap.org",
      token: "UNI",
      tvl: "$890K",
      volume24h: "$67K",
      members: 28,
      apy: "8.7%",
    },
    {
      name: "Compound Finance Pool",
      domain: "compound.finance",
      token: "COMP",
      tvl: "$1.2M",
      volume24h: "$89K",
      members: 32,
      apy: "15.2%",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Active DAO Pools</h1>
          <p className="text-lg opacity-80">Explore gated liquidity pools created by DAOs and foundations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool, index) => (
            <div key={index} className="card bg-base-200 shadow-xl token-card">
              <div className="card-body">
                <h3 className="card-title text-lg">{pool.name}</h3>
                <p className="text-sm opacity-70 mb-4">@{pool.domain}</p>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                      TVL
                    </span>
                    <span className="font-semibold">{pool.tvl}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      24h Volume
                    </span>
                    <span className="font-semibold">{pool.volume24h}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-secondary" />
                      Members
                    </span>
                    <span className="font-semibold">{pool.members}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-success" />
                      APY
                    </span>
                    <span className="font-semibold text-success">{pool.apy}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline">{pool.token}</div>
                  <button className="btn btn-primary btn-sm">View Pool</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
