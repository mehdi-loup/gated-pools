import { useEffect, useState } from "react";
import { createPublicClient, http, parseAbiItem } from "viem";
import { GATED_POOL_HOOK_ADDRESS } from "./helpers";
import { sepolia } from "viem/chains";

// Define the return type for our hook
interface GatedPool {
  poolId: string;
  domainHash: string;
}

// ABI for the event we want to listen to
const eventAbi = parseAbiItem(
  "event VerificationParamsSetup(bytes32 indexed poolId, bytes32 domainHash)",
);

/**
 * Custom hook to fetch all gated pools from the GatedPoolHook contract
 * @returns An object containing the pools, loading state, and error state
 */
export function useFetchPools() {
  const [pools, setPools] = useState<GatedPool[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPools() {
      try {
        setIsLoading(true);

        // Create a public client to interact with the blockchain
        const client = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        // Fetch all VerificationParamsSetup events
        const logs = await client.getLogs({
          address: GATED_POOL_HOOK_ADDRESS,
          event: eventAbi,
          fromBlock: BigInt(0), // Start from genesis block
          toBlock: "latest",
        });

        // Transform logs into GatedPool objects
        const fetchedPools = logs.map((log) => ({
          poolId: log.args.poolId as string,
          domainHash: log.args.domainHash as string,
        }));

        setPools(fetchedPools);
        setError(null);
      } catch (err) {
        console.error("Error fetching pools:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch pools"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPools();
  }, []);

  return { pools, isLoading, error };
}
