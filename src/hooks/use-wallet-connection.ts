import { useWallets } from "@reactive-dot/react";
import { useEffect, useState } from "react";

export function useWalletConnection() {
  const wallets = useWallets();
  const [isConnected, setIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    if (wallets && wallets.length > 0) {
      const wallet = wallets[0];
      
      // Subscribe to accounts observable
      const subscription = wallet.accounts$.subscribe({
        next: (accounts) => {
          setAccounts(accounts);
          setIsConnected(accounts.length > 0);
          setConnectedWallet(accounts.length > 0 ? wallet : null);
        },
        error: (error) => {
          console.error("Error subscribing to wallet accounts:", error);
          setAccounts([]);
          setIsConnected(false);
          setConnectedWallet(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setAccounts([]);
      setIsConnected(false);
      setConnectedWallet(null);
    }
  }, [wallets]);

  return {
    isConnected,
    connectedWallet,
    accounts,
    walletName: connectedWallet?.name,
  };
} 