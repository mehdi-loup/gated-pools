"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Building2, Coins, Shield, CheckCircle } from "lucide-react"
import useCreateGatedPool from "@/hooks/gated-pool/useCreateGatedPool"
import { Hex, keccak256, stringToBytes } from "viem"

export default function CreateDAOPage() {
  const [formData, setFormData] = useState({
    domainName: "" as Hex,
    tokenAddress: "" as `0x${string}`,
  });
  const [submitting, setIsSubmitting] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const { createPool, status } = useCreateGatedPool(formData.tokenAddress, 0, 100, keccak256(stringToBytes(formData.domainName)))
  const isSubmitting = submitting || status === 'pending';
  const isSuccess = success || status === 'success';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await createPool(setIsSuccess);

    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h2 className="card-title text-3xl justify-center mb-4">DAO Pool Created Successfully!</h2>
                <p className="text-lg mb-6">
                  Your gated liquidity pool for <strong>{formData.domainName}</strong> has been created. Employees with{" "}
                  <strong>@{formData.domainName}</strong> email addresses can now access the private swap interface.
                </p>
                <div className="alert alert-info">
                  <Shield className="w-5 h-5" />
                  <span>Pool verification and email domain setup instantly.</span>
                </div>
                <div className="card-actions justify-center mt-6">
                  <button className="btn btn-primary" onClick={() => setIsSuccess(false)}>
                    Create Another Pool
                  </button>
                  <button className="btn btn-accent">View Pool Dashboard</button>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Create DAO Liquidity Pool</h1>
            <p className="text-lg opacity-80">Set up a private, gated liquidity pool for your DAO or foundation</p>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* DAO Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-primary" />
                      DAO Information
                    </h3>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Domain Name</span>
                      </label>
                      <input
                        type="text"
                        name="domainName"
                        value={formData.domainName}
                        onChange={handleInputChange}
                        placeholder="e.g., ethereum.org"
                        className="input input-bordered w-full"
                        required
                      />
                      <label className="label">
                        <span className="label-text-alt">
                          Only employees with this email domain can access the pool
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Token Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Coins className="w-5 h-5 mr-2 text-accent" />
                      DAO Token Information
                    </h3>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Token Contract Address</span>
                      </label>
                      <input
                        type="text"
                        name="tokenAddress"
                        value={formData.tokenAddress}
                        onChange={handleInputChange}
                        placeholder="0x..."
                        className="input input-bordered w-full font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="divider">Pool Features</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-primary">
                      <Shield className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Email Verification</div>
                    <div className="stat-desc">Gated access control</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-accent">
                      <Coins className="w-8 h-8" />
                    </div>
                    <div className="stat-title">MEV Protection</div>
                    <div className="stat-desc">Zero slippage loss</div>
                  </div>
                  <div className="stat bg-base-100 rounded-lg">
                    <div className="stat-figure text-secondary">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Cross-Chain</div>
                    <div className="stat-desc">Multi-chain support</div>
                  </div>
                </div>

                <div className="card-actions justify-end pt-6">
                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Pool..." : "Create DAO Pool"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
