import { v4 as uuid } from "uuid";

export const getTargetEmailAddressAndId = (): {
  emailId: string;
  targetEmail: string;
} => {
  const emailId = uuid();
  const targetEmail = `${emailId}@proving.vlayer.xyz`;
  return { emailId, targetEmail };
};

export const EMAIL_SERVICE_URL = process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL!;
export const EMAIL_PROVER_ADDRESS =
  process.env.NEXT_PUBLIC_EMAIL_PROVER_ADDRESS!;
export const DNS_SERVICE_URL = process.env.NEXT_PUBLIC_DNS_SERVICE_URL!;
export const VLAYER_API_TOKEN = process.env.NEXT_PUBLIC_VLAYER_API_TOKEN!;
export const PROVER_GAS_LIMIT = process.env.NEXT_PUBLIC_PROVER_GAS_LIMIT!;
export const PROVER_URL = process.env.NEXT_PUBLIC_PROVER_URL!;

export const USDC_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!;

export const proverConfig = {
  proverUrl: PROVER_URL,
  token: VLAYER_API_TOKEN,
};
