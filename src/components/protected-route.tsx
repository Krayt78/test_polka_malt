import { Navigate } from "react-router-dom";
import { useWalletConnection } from "../hooks/use-wallet-connection";
import Loading from "./Loading";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isConnected, accounts } = useWalletConnection();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give some time to establish wallet connection
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading while checking connection
  if (isLoading) {
    return <Loading />;
  }

  // Redirect to home if no wallet is connected or no accounts
  if (!isConnected || accounts.length === 0) {
    return <Navigate to="/" replace />;
  }

  // Render protected content if connected
  return <>{children}</>;
} 