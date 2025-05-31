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
