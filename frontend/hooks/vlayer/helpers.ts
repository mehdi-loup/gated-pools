import { v4 as uuid } from "uuid";

export const getTargetEmailAddressAndId = (): {
  emailId: string;
  targetEmail: string;
} => {
  const emailId = uuid();
  const targetEmail = `${emailId}@proving.vlayer.xyz`;
  return { emailId, targetEmail };
};

export const EMAIL_SERVICE_URL = "";
export const EMAIL_PROVER_ADDRESS = "";
export const EMAIL_VERIFIER_ADDRESS = "";
export const DNS_SERVICE_URL = "";
export const VLAYER_API_TOKEN = "";
export const PROVER_GAS_LIMIT = 2_000_000;
