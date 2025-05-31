import Link from "next/link"
import { Shield, Zap } from "lucide-react"
import { RainbowKitCustomConnectButton } from "./ConnectButton"

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-lg">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Shield className="w-6 h-6 mr-2 text-primary" />
          ChainGate DEX
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/dao/create" className="btn btn-ghost">
              Create DAO Pool
            </Link>
          </li>
          <li>
            <Link href="/swap" className="btn btn-ghost">
              Swap
            </Link>
          </li>
          <li>
            <Link href="/pools" className="btn btn-ghost">
              Pools
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  )
}
