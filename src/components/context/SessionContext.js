import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  return (
    <SessionContext.Provider value={{ session, status, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);