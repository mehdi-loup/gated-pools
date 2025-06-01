"use client";

import { useSwap } from "../hooks/gated-pool/useSwap";

// Hardcoded test values
const TEST_TOKEN_IN = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" as const; // USDC
const TEST_TOKEN_OUT = "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf" as const; // cbBTC
const TEST_FEE = 3000; // 0.3%
const TEST_TICK_SPACING = 60;
const HOOK_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SwapButton = () => {
  // Initialize the swap hook with test values
  const { swapExactInputSingle, status } = useSwap(
    TEST_TOKEN_IN,
    TEST_TOKEN_OUT,
    TEST_FEE,
    TEST_TICK_SPACING,
    HOOK_ADDRESS
  );

  // Hardcoded test amounts
  const testAmountIn = BigInt("100000"); // .1 USDC
  const testMinAmountOut = BigInt("0"); // No minimum for testing

  const handleSwap = async () => {
    try {
      await swapExactInputSingle(testAmountIn, testMinAmountOut);
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">Test Swap</h2>
      <div className="text-sm text-gray-600">
        <p>Token In: {TEST_TOKEN_IN}</p>
        <p>Token Out: {TEST_TOKEN_OUT}</p>
        <p>Amount In: {testAmountIn.toString()} (1 DAI)</p>
        <p>Fee: {TEST_FEE / 10000}%</p>
      </div>
      <button
        onClick={handleSwap}
        disabled={status === "pending"}
        className={`px-4 py-2 rounded-lg font-medium ${
          status === "pending"
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}>
        {status === "pending" ? "Swapping..." : "Test Swap"}
      </button>
      {status && (
        <p
          className={`text-sm ${
            status === "error"
              ? "text-red-500"
              : status === "success"
              ? "text-green-500"
              : "text-blue-500"
          }`}>
          Status: {status}
        </p>
      )}
    </div>
  );
};
