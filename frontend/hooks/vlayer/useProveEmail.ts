import { useCallback } from "react";
import { useChainId } from "wagmi";
import { useCallProver, useWaitForProvingResult } from "@vlayer/react";
import { BrandedHash, preverifyEmail } from "@vlayer/sdk";
import emailProverSpec from "./abis/EmailDomainDAOProver.json";
import { Abi, Address } from "viem";
import {
  DNS_SERVICE_URL,
  EMAIL_PROVER_ADDRESS,
  PROVER_GAS_LIMIT,
  VLAYER_API_TOKEN,
} from "./helpers";

type useGetEmailProofOutput = {
  startProving: () => Promise<void>;
  proofHash: BrandedHash<Abi, string> | null;
  callProverError: Error | null;
};

const useGetEmailProof = (
  emlContent: string,
  expectedDomain: string,
): useGetEmailProofOutput => {
  const chainId = useChainId();
  const {
    callProver,
    data: proofHash,
    error: callProverError,
  } = useCallProver({
    address: EMAIL_PROVER_ADDRESS as Address,
    proverAbi: emailProverSpec.abi as any,
    functionName: "main",
    gasLimit: Number(PROVER_GAS_LIMIT),
    chainId: chainId,
  });

  const startProving = useCallback(async () => {
    try {
      const email = await preverifyEmail({
        mimeEmail: emlContent,
        dnsResolverUrl: DNS_SERVICE_URL,
        token: VLAYER_API_TOKEN,
      });
      await callProver([email, expectedDomain]);
    } catch (error) {
      console.log(error);
    }
  }, [emlContent, expectedDomain, callProver]);
  return { startProving, proofHash, callProverError };
};

type useProveEmailOutput = {
  startProving: () => Promise<void>;
  proof: string | undefined;
  error: Error | null;
};
export const useProveEmail = (
  emlContent: string,
  expectedDomain: string,
): useProveEmailOutput => {
  const { startProving, proofHash, callProverError } = useGetEmailProof(
    emlContent,
    expectedDomain,
  );
  const { data: proof, error: provingError } =
    useWaitForProvingResult(proofHash);

  return {
    startProving,
    proof: proof as string | undefined,
    error: provingError || callProverError,
  };
};

export default useProveEmail;
