import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  connectToMetaMask,
  getActiveWallet,
  listenToAccountChanges,
  hasEthereum,
  unmountEthListeners,
  getCompanyDetails,
} from "../services/web3Services";

import { useHistory } from "react-router-dom";
import { useToastContext } from "./toastContext";
import { useLoadingContext } from "./loadingContext";

const userContext = createContext();

export function WalletProvider({ children }) {
  const { toast } = useToastContext();
  const { setIsLoading } = useLoadingContext();
  const history = useHistory();
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  const [user, setUser] = useState({ address: null, pharmacyDetails: null });

  const setAddress = useCallback(
    (address) => {
      return (() => {
        let updatedUser = { ...user };
        updatedUser.address = address;
        setUser(updatedUser);
        setIsConnected(true);
      })();
    },
    [user]
  );

  const setPharmacy = useCallback(() => {
    (async () => {
      const pharmacyDetails = await getCompanyDetails();

      let updatedUser = { ...user };
      updatedUser.pharmacyDetails = pharmacyDetails;
      updatedUser.address = getActiveWallet();
      setUser(updatedUser);
    })();
  }, [user]);

  const handleWalletConnect = useCallback(() => {
    return (async () => {
      setIsLoading(true);
      const connectionStatus = await connectToMetaMask();
      if (connectionStatus.error) return false;

      const address = getActiveWallet();
      setAddress(address);

      await setPharmacy();

      setIsConnected(true);

      localStorage.setItem("wallet-connection", true);

      setTimeout(() => {
        // history.replace("/dashboard/user");
      }, 0);

      setIsLoading(false);

      return true;
    })();
  }, [setAddress, setPharmacy, setIsLoading]);

  const handleWalletDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem("wallet-connection");
    setTimeout(() => {
      history.replace("/");
    }, 0);
  };

  const handleAccountChanged = (address) => {
    if (!address) return handleWalletDisconnect();
    setAddress(address);
  };

  useEffect(() => {
    if (!isInitiallyFetched) return;

    if (!hasEthereum()) return;
    listenToAccountChanges(handleAccountChanged);

    return unmountEthListeners();
  });

  useEffect(() => {
    if (isInitiallyFetched) return;
    if (!hasEthereum()) {
      toast.error("Please Install Meta Mask");
      return setHasMetaMask(false);
    }
    const isInjected = localStorage.getItem("wallet-connection");
    if (!isInjected) return setIsInitiallyFetched(true);

    handleWalletConnect();
    setIsInitiallyFetched(true);
  }, [handleWalletConnect, isInitiallyFetched, toast]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        isConnected,
        setIsConnected,
        handleWalletConnect,
        handleWalletDisconnect,
        hasMetaMask,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(userContext);

  if (!context)
    throw new Error("useWallet must be used inside a `WalletProvider`");

  return context;
}
