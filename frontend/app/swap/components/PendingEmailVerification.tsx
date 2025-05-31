import useFetchEmail from "@/hooks/vlayer/useFetchEmail";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export function PendingEmailVerification({emailId, onComplete }: {emailId:string; onComplete(emlContent: string): void }) {
   const emlFileData = useFetchEmail(emailId);

    useEffect(() => {
      if(!emlFileData) return;
      
      onComplete(emlFileData);
    },[emlFileData])

    return (
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
        </div>)
}