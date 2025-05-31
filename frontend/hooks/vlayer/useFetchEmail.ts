import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EMAIL_SERVICE_URL } from "./helpers";

const useFetchEmail = (emailId: string | undefined): string | undefined => {
  const [emlFileData, setEmlFileData] = useState<string | undefined>(undefined);

  const { data, status } = useQuery({
    queryKey: ["receivedEmailEmlContent", emailId],
    queryFn: async () => {
      const response = await fetch(`${EMAIL_SERVICE_URL}/${emailId}.eml`);
      if (!response.ok) {
        throw new Error("Failed to fetch email");
      }
      return response.text();
    },
    enabled: !!emailId,
    retry: 10,
    retryDelay: 5000, // 10 sec delay between fetch retries
  });

  useEffect(() => {
    if (data && status === "success") {
      setEmlFileData(data);
    }
  }, [data, status]);

  return emlFileData;
};

export default useFetchEmail;
