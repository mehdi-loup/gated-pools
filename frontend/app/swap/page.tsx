"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Mail, Shield, CheckCircle, AlertCircle, House } from "lucide-react"
import { DAO, DAO_MAPPING } from "@/hooks/vlayer/daoMapping"
import { DAOItem } from "./components/DaoItem"
import { getTargetEmailAddressAndId } from "@/hooks/vlayer/helpers"
import { PendingEmailVerification } from "./components/PendingEmailVerification"
import { SwapForm } from "./components/SwapForm"

export default function SwapPage() {
  const [emailContent, setEmailContent] = useState("")
  const [step, setStep] = useState<"dao" | "input" | "email" | "pending" | "success" | "rejected">("dao")
  const [emailSent, setEmailSent] = useState(false);
  const [selectedDao, setSelectedDao] = useState<DAO | undefined>();
  const [verificationEmail, setVerificationEmail] = useState<{
    emailId: string;
    targetEmail: string;
  } | undefined>()

  const handleSubmitDao = () => {
    const targetEmail = getTargetEmailAddressAndId();
    setVerificationEmail(targetEmail);
    setStep("email")
  }

  const handleEmailSent = () => {
    setEmailSent(true)
    setStep("pending")
  }

  const resetSwap = () => {
    setStep("dao");
    setEmailSent(false)
  }

  if (step === "dao") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <House className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="card-title text-2xl justify-center mb-4">Select your DAO</h2>
                <p className="mb-6">
                  Only select a DAO for which you have access to an email associated with it.
                </p>

                <select defaultValue="Pick a dao" className="select" onChange={({ target: { value } }) => {
                  console.log(value)
                  const nextDao = DAO_MAPPING.find(({ name }) => name === value);

                  setSelectedDao(nextDao);
                }}>
                  {DAO_MAPPING.map((dao) => (
                    <option key={dao.name} value={dao.name} className="h-auto py-3">
                      <DAOItem dao={dao} />
                    </option>
                  ))}
                </select>



                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={handleSubmitDao} disabled={!selectedDao?.expectedDomain}>
                    {selectedDao ? `I work for ${selectedDao.name} ✓` : "No dao selected"}
                  </button>
                  <button className="btn btn-ghost" onClick={resetSwap}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                  To complete your swap for <strong>USDC</strong>, please send an email from your verified company email address.
                </p>

                <div className="alert alert-info mb-6">
                  <Shield className="w-5 h-5" />
                  <div className="text-left">
                    <h4 className="font-semibold">Email Instructions:</h4>
                    <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                      <li>
                        Send an email to: <code className="bg-base-300 text-white px-1 rounded">{verificationEmail?.targetEmail}</code>
                      </li>
                      <li>Use your company email address (@yourcompany.com)</li>
                      <li>
                        Subject: "Swap Verification to USDC"
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
                    return
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "pending" && verificationEmail) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <PendingEmailVerification emailId={verificationEmail.emailId} onComplete={(emailContent: string) => {
          setEmailContent(emailContent);
          setStep("input")
        }} />
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
                  Your swap for <strong>USDC</strong> has been authorized and executed.
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
      <SwapForm expectedDomain={selectedDao!.expectedDomain} emailContent={emailContent} onComplete={(result: boolean) => setStep(result ? 'success' : 'rejected')} />
    </div>
  )
}
