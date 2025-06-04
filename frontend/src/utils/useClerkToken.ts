import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export function useClerkToken() {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await getToken({ template: "JWT" });
      setToken(t);
    })();
  }, [getToken]);

  return token;
}
