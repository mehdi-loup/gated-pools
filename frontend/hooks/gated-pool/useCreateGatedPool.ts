import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { GATED_POOL_HOOK_ADDRESS } from "./helpers";
import { GatedPoolHookAbi } from "./abis/GatedPoolHookAbi";
import { Address, Hex } from "viem";

const useCreateGatedPool = (
  token0: Address | undefined,
  token1: Address | undefined,
  fee: number | undefined,
  initialTickSpacing: number | undefined,
  domainHash: Hex | undefined
): { createPool: () => Promise<void>; status: string | undefined } => {
  if (!token0 || !token1 || !domainHash || !fee || !initialTickSpacing) {
    return { createPool: async () => {}, status: undefined };
  }

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

  const createPool = async () => {
    try {
      writeContract({
        address: GATED_POOL_HOOK_ADDRESS,
        abi: GatedPoolHookAbi,
        functionName: "initializeGatedPool",
        args: [
          {
            currency0: token0,
            currency1: token1,
            fee,
            tickSpacing: initialTickSpacing,
            hooks: GATED_POOL_HOOK_ADDRESS,
          },
          BigInt("79228162514264337593543950336"),
          domainHash,
        ],
      });
    } catch (error) {
      console.error("Error creating pool:", error);
      setStatus("error");
    }
  };

  return { createPool, status };
};
