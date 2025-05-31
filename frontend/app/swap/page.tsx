"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { ArrowDownUp, Mail, Shield, CheckCircle, AlertCircle, Coins } from "lucide-react"

interface Token {
  symbol: string
  name: string
  address: string
  balance: string
  icon: string
}

const tokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", address: "0x...", balance: "2.5", icon: "⟠" },
  { symbol: "USDC", name: "USD Coin", address: "0x...", balance: "1,250.00", icon: "💵" },
  { symbol: "UNI", name: "Uniswap", address: "0x...", balance: "45.2", icon: "🦄" },
  { symbol: "COMP", name: "Compound", address: "0x...", balance: "12.8", icon: "🏛️" },
]

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0])
  const [toToken, setToToken] = useState<Token>(tokens[1])
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"input" | "email" | "pending" | "success" | "rejected">("input")
  const [emailSent, setEmailSent] = useState(false)
  const [verificationEmail] = useState("verify@chaingate.dex")

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  const handleSubmitSwap = () => {
    if (amount && fromToken && toToken) {
      setStep("email")
    }
  }

  const handleEmailSent = () => {
    setEmailSent(true)
    setStep("pending")

    // Simulate email verification process
    setTimeout(() => {
      // Random approval/rejection for demo
      const approved = Math.random() > 0.3
      setStep(approved ? "success" : "rejected")
    }, 5000)
  }

  const resetSwap = () => {
    setStep("input")
    setAmount("")
    setEmailSent(false)
  }

  const renderTokenSelector = (selectedToken: Token, onSelect: (token: Token) => void, label: string) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="dropdown dropdown-bottom w-full">
        <div tabIndex={0} role="button" className="btn btn-outline w-full justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{selectedToken.icon}</span>
            <div className="text-left">
              <div className="font-semibold">{selectedToken.symbol}</div>
              <div className="text-xs opacity-70">{selectedToken.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">Balance</div>
            <div className="font-mono">{selectedToken.balance}</div>
          </div>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full mt-1">
          {tokens.map((token) => (
            <li key={token.symbol}>
              <a onClick={() => onSelect(token)} className="flex justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{token.icon}</span>
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-xs opacity-70">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{token.balance}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  if (step === "email") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="card-title text-2xl justify-center mb-4">Email Verification Required</h2>
                <p className="mb-6">
                  To complete your swap of{" "}
                  <strong>
                    {amount} {fromToken.symbol}
                  </strong>{" "}
                  for <strong>{toToken.symbol}</strong>, please send an email from your verified company email address.
                </p>

                <div className="alert alert-info mb-6">
                  <Shield className="w-5 h-5" />
                  <div className="text-left">
                    <h4 className="font-semibold">Email Instructions:</h4>
                    <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                      <li>
                        Send an email to: <code className="bg-base-300 px-1 rounded">{verificationEmail}</code>
                      </li>
                      <li>Use your company email address (@yourcompany.com)</li>
                      <li>
                        Subject: "Swap Verification - {fromToken.symbol} to {toToken.symbol}"
                      </li>
                      <li>Include your wallet address in the email body</li>
                    </ol>
                  </div>
                </div>

                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={handleEmailSent} disabled={emailSent}>
                    {emailSent ? "Email Sent ✓" : "I've Sent the Email"}
                  </button>
                  <button className="btn btn-ghost" onClick={resetSwap}>
                    Cancel Swap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "pending") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="loading loading-spinner loading-lg text-primary mx-auto mb-4"></div>
                <h2 className="card-title text-2xl justify-center mb-4">Verifying Email...</h2>
                <p className="mb-6">We're processing your email verification. This usually takes a few moments.</p>

                <div className="timeline timeline-vertical">
                  <div className="timeline-item">
                    <div className="timeline-start">Email Received</div>
                    <div className="timeline-middle">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div className="timeline-end timeline-box">Email successfully received from verified domain</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-start">Domain Verification</div>
                    <div className="timeline-middle">
                      <div className="loading loading-spinner loading-sm"></div>
                    </div>
                    <div className="timeline-end timeline-box">Verifying email domain authorization...</div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-start">Swap Authorization</div>
                    <div className="timeline-middle">
                      <div className="w-5 h-5 bg-base-300 rounded-full"></div>
                    </div>
                    <div className="timeline-end timeline-box">Pending verification completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h2 className="card-title text-2xl justify-center mb-4">Swap Authorized!</h2>
                <p className="mb-6">
                  Your swap of{" "}
                  <strong>
                    {amount} {fromToken.symbol}
                  </strong>{" "}
                  for <strong>{toToken.symbol}</strong> has been authorized and executed.
                </p>

                <div className="stats shadow mb-6">
                  <div className="stat">
                    <div className="stat-title">Transaction Hash</div>
                    <div className="stat-value text-sm font-mono">0x1234...5678</div>
                    <div className="stat-desc">View on Etherscan</div>
                  </div>
                </div>

                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={resetSwap}>
                    Make Another Swap
                  </button>
                  <button className="btn btn-ghost">View Transaction</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "rejected") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
                <h2 className="card-title text-2xl justify-center mb-4">Swap Rejected</h2>
                <p className="mb-6">Your swap request was rejected. This could be due to:</p>

                <div className="alert alert-error mb-6">
                  <AlertCircle className="w-5 h-5" />
                  <div className="text-left">
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Email sent from unauthorized domain</li>
                      <li>Insufficient verification information</li>
                      <li>Pool liquidity constraints</li>
                      <li>Security policy violation</li>
                    </ul>
                  </div>
                </div>

                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={resetSwap}>
                    Try Again
                  </button>
                  <button className="btn btn-ghost">Contact Support</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Secure Token Swap</h1>
            <p className="text-lg opacity-80">Private, MEV-protected swapping for verified employees</p>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="space-y-6">
                {/* From Token */}
                {renderTokenSelector(fromToken, setFromToken, "From")}

                {/* Amount Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Amount</span>
                    <span className="label-text-alt">
                      Balance: {fromToken.balance} {fromToken.symbol}
                    </span>
                  </label>
                  <div className="join">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="input input-bordered join-item flex-1 text-right font-mono text-lg"
                    />
                    <button className="btn btn-outline join-item" onClick={() => setAmount(fromToken.balance)}>
                      MAX
                    </button>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button className="btn btn-circle btn-outline" onClick={handleSwapTokens}>
                    <ArrowDownUp className="w-5 h-5" />
                  </button>
                </div>

                {/* To Token */}
                {renderTokenSelector(toToken, setToToken, "To")}

                {/* Estimated Output */}
                {amount && (
                  <div className="alert alert-info">
                    <Coins className="w-5 h-5" />
                    <div>
                      <h4 className="font-semibold">Estimated Output</h4>
                      <p>
                        ≈ {(Number.parseFloat(amount) * 1.02).toFixed(4)} {toToken.symbol}
                      </p>
                      <p className="text-xs opacity-70">Rate includes MEV protection premium</p>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="alert alert-warning">
                  <Shield className="w-5 h-5" />
                  <div>
                    <h4 className="font-semibold">Email Verification Required</h4>
                    <p className="text-sm">
                      You'll need to verify this swap via email from your company address before execution.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className="btn btn-primary btn-lg w-full"
                  onClick={handleSubmitSwap}
                  disabled={!amount || !fromToken || !toToken || Number.parseFloat(amount) <= 0}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Initiate Verified Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
