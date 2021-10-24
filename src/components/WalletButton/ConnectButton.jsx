import React from "react";
import { NormalButton } from "../NormalButton";
import { WalletIcon } from "../../assets";
import styles from "./connect-button.module.css";
import { useConnectToWallet } from "ethereal-react";
import { useHistory } from "react-router-dom";

function ConnectButton({ setDisplay }) {
  const history = useHistory();
  const [connect, { loading, error }] = useConnectToWallet();
  console.log(error);
  const handleConnect = () => {
    connect();
    setTimeout(() => {
      if (!error && !loading) history.push("/dashboard/user");
    }, 2000);
  };
  return (
    <div>
      {error && !error.message && (
        <div className="">
          <a
            rel="noreferrer"
            referrerPolicy="no-referrer"
            target="_blank"
            href="https://metamask.io/download"
          >
            <NormalButton buttonText="Get Meta mask" />
          </a>
        </div>
      )}
      {error && <div>Error connecting to wallet: {error.message}</div>}

      {!error && (
        <NormalButton bg="#022655" onClick={handleConnect} disabled={loading}>
          <span className="hidden md:block">Connect Wallet</span>
          <WalletIcon className={`${styles["wallet-icon"]} md:hidden`} />
        </NormalButton>
      )}
    </div>
  );
}

export { ConnectButton };