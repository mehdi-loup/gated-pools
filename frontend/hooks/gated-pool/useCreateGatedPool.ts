import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { GATED_POOL_HOOK_ADDRESS } from "./helpers";
import { GatedPoolHookAbi } from "./abis/GatedPoolHookAbi";
import { Address, Hex } from "viem";
import { DAO_TOKEN_ADDRESS,USDC_TOKEN_ADDRESS } from "../vlayer/helpers";

const useCreateGatedPool = (
  fee: number,
  initialTickSpacing: number,
  domainHash: Hex,
): { createPool: () => Promise<void>; status: 'pending' | 'success' | 'idle' | 'error' } => {
  const [status, setStatus] = useState<'pending' | 'success' | 'idle' | 'error'>('idle');

  const { writeContractAsync, data, isPending } = useWriteContract();

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
      await writeContractAsync({
        address: GATED_POOL_HOOK_ADDRESS,
        abi: GatedPoolHookAbi,
        functionName: "initializeGatedPool",
        args: [
          {
            currency0: DAO_TOKEN_ADDRESS as `0x`,
            currency1: USDC_TOKEN_ADDRESS as `0x`,
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

export default useCreateGatedPool;
