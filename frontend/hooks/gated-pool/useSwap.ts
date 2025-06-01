"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { GATED_POOL_HOOK_ADDRESS } from "./helpers";
import { Address, Hex, encodeAbiParameters, parseAbiParameters } from "viem";

// Constants for Universal Router commands
const COMMANDS = {
  V4_SWAP: 0x10,
} as const;

// Constants for V4Router actions
const ACTIONS = {
  SWAP_EXACT_IN_SINGLE: 0x06,
  SETTLE_ALL: 0x0c,
  TAKE_ALL: 0x0f,
} as const;

const swapAbi = [
  {
    inputs: [
      { internalType: "bytes", name: "commands", type: "bytes" },
      { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export const useSwap = (
  tokenIn: Address | undefined,
  tokenOut: Address | undefined,
  fee: number | undefined,
  tickSpacing: number | undefined,
  hookAddress: Address | undefined
): {
  swapExactInputSingle: (
    amountIn: bigint,
    minAmountOut: bigint
  ) => Promise<void>;
  status: string | undefined;
} => {
  if (!tokenIn || !tokenOut || !fee || !tickSpacing || !hookAddress) {
    return {
      swapExactInputSingle: async () => {},
      status: undefined,
    };
  }

  // Derive token0, token1, and zeroForOne from tokenIn and tokenOut
  const [token0, token1, zeroForOne] =
    tokenIn.toLowerCase() < tokenOut.toLowerCase()
      ? [tokenIn, tokenOut, true]
      : [tokenOut, tokenIn, false];

  const [status, setStatus] = useState<string | undefined>(undefined);

  const { writeContract, data, isPending } = useWriteContract();

  const { isLoading: isWaiting, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  useEffect(() => {
    if (isPending || isWaiting) {
      setStatus("pending");
    } else if (isConfirmed) {
      setStatus("success");
    }
  }, [isPending, isWaiting, isConfirmed]);

  const swapExactInputSingle = async (
    amountIn: bigint,
    minAmountOut: bigint
  ) => {
    try {
      // First, properly encode the actions as a bytes array
      const actions = encodeAbiParameters(parseAbiParameters("uint8[]"), [
        [ACTIONS.SWAP_EXACT_IN_SINGLE, ACTIONS.SETTLE_ALL, ACTIONS.TAKE_ALL],
      ]);

      // Then encode the pool key properly
      const poolKey = [token0, token1, fee, tickSpacing, hookAddress] as const;

      // Encode the swap parameters
      const swapParams = encodeAbiParameters(
        parseAbiParameters(
          "(address,address,uint24,int24,address),bool,uint128,uint128,bytes"
        ),
        [poolKey, zeroForOne, amountIn, minAmountOut, "0x"]
      );

      // Encode the input/output token parameters
      const inputParams = encodeAbiParameters(
        parseAbiParameters("address,uint128"),
        [tokenIn, amountIn]
      );

      const outputParams = encodeAbiParameters(
        parseAbiParameters("address,uint128"),
        [tokenOut, minAmountOut]
      );

      // Combine all parameters
      const inputs = [
        encodeAbiParameters(parseAbiParameters("bytes,bytes[]"), [
          actions,
          [swapParams, inputParams, outputParams],
        ]),
      ];

      // Encode the Universal Router command
      const command = `0x${COMMANDS.V4_SWAP.toString(16).padStart(
        2,
        "0"
      )}` as Hex;

      // Execute the swap through the Universal Router
      writeContract({
        address: "0x6ff5693b99212da76ad316178a184ab56d299b43", // Universal Router address
        abi: swapAbi,
        functionName: "execute",
        args: [command, inputs],
      });
    } catch (error) {
      console.error("Error executing swap:", error);
      setStatus("error");
    }
  };

  return { swapExactInputSingle, status };
};
