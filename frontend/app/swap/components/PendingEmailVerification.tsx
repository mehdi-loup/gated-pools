import useFetchEmail from "@/hooks/vlayer/useFetchEmail";
import { CheckCircle, Loader2, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";

const timelineItems = [
    {
        title: "Email Received",
        description: "Email successfully received from verified domain",
        status: "completed"
    },
    {
        title: "Domain Verification",
        description: "Verifying email domain authorization...",
        status: "loading"
    },
    {
        title: "Swap Authorization",
        description: "Pending verification completion",
        status: "pending"
    }
];

export function PendingEmailVerification({ emailId, onComplete }: { emailId: string; onComplete(emlContent: string): void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCheck, setShowCheck] = useState(false);

    const emlFileData = useFetchEmail(emailId);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex === timelineItems.length - 1) {
                if (emlFileData) onComplete(emlFileData);
                return;
            }

            // Show CircleCheck 1 second before switching
            setTimeout(() => {
                setShowCheck(true);
            }, 4000);

            // Switch to next item after 5 seconds
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                setShowCheck(false);
            }, 5000);
        }, 5000);

        return () => clearInterval(interval);
    }, [emlFileData, currentIndex]);

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto">
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body text-center">
                        <div className="loading loading-spinner loading-lg text-primary mx-auto mb-4"></div>
                        <h2 className="card-title text-2xl justify-center mb-4">Verifying Email...</h2>
                        <p className="mb-6">We're processing your email verification. This usually takes less than a minute.</p>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-400 to-purple-600"></div>

                            {/* Timeline items */}
                            <div className="space-y-8">
                                {timelineItems.map((item, index) => (
                                    <div
                                        key={item.title}
                                        className={`relative flex items-start transition-all duration-1000 ease-out transform ${index === currentIndex
                                                ? 'translate-x-0 opacity-100 scale-100'
                                                : index < currentIndex
                                                    ? '-translate-x-4 opacity-60 scale-95'
                                                    : 'translate-x-8 opacity-30 scale-90'
                                            }`}
                                    >
                                        {/* Timeline dot with loader/check */}
                                        <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-indigo-200">
                                            {index === currentIndex ? (
                                                showCheck ? (
                                                    <CircleCheck className="w-8 h-8 text-green-500 animate-pulse" />
                                                ) : (
                                                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                                )
                                            ) : index < currentIndex ? (
                                                <CircleCheck className="w-8 h-8 text-green-500" />
                                            ) : (
                                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                            )}
                                        </div>

                                        {/* Content card */}
                                        <div className={`ml-8 flex-1 bg-white rounded-xl shadow-lg p-6 border-l-4 transition-all duration-500 ${index === currentIndex
                                                ? 'border-l-indigo-500 shadow-xl'
                                                : index < currentIndex
                                                    ? 'border-l-green-500 shadow-md'
                                                    : 'border-l-gray-300 shadow-sm'
                                            }`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`text-xl font-semibold transition-colors duration-300 ${index === currentIndex
                                                        ? 'text-indigo-700'
                                                        : index < currentIndex
                                                            ? 'text-green-700'
                                                            : 'text-gray-600'
                                                    }`}>
                                                    {item.title}
                                                </h3>
                                                <span className={`text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300 ${index === currentIndex
                                                        ? 'bg-indigo-100 text-indigo-700'
                                                        : index < currentIndex
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className={`transition-colors duration-300 ${index === currentIndex
                                                    ? 'text-gray-700'
                                                    : index < currentIndex
                                                        ? 'text-gray-600'
                                                        : 'text-gray-500'
                                                }`}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>)
}