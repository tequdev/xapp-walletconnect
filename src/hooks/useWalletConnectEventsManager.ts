import { XRPL_SIGNING_METHODS } from "@/data/XRPLData";

import ModalStore from "@/store/ModalStore";
import { web3Wallet } from "@/utils/WalletConnectUtil";
import { Web3WalletTypes } from "@walletconnect/web3wallet";
import { useCallback, useEffect } from "react";

export default function useWalletConnectEventsManager(initialized: boolean) {
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const onSessionProposal = useCallback(
    (proposal: Web3WalletTypes.EventArguments["session_proposal"]) => {
      ModalStore.open("SessionProposalModal", { proposal });
    },
    []
  );

  const onAuthRequest = useCallback((request: Web3WalletTypes.AuthRequest) => {
    ModalStore.open("AuthRequestModal", { request });
  }, []);

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: Web3WalletTypes.EventArguments["session_request"]) => {
      console.log("session_request", requestEvent);
      const { topic, params } = requestEvent;
      const { request } = params;
      const requestSession = web3Wallet.engine.signClient.session.get(topic);

      switch (request.method) {
        case XRPL_SIGNING_METHODS.XRPL_SIGN_TRANSACTION:
        case XRPL_SIGNING_METHODS.XRPL_SIGN_TRANSACTION_FOR:
          return ModalStore.open("SessionSignXrplModal", {
            requestEvent,
            requestSession,
          });

        default:
          return ModalStore.open("SessionUnsuportedMethodModal", {
            requestEvent,
            requestSession,
          });
      }
    },
    []
  );

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized) {
      web3Wallet.on("session_proposal", onSessionProposal);
      web3Wallet.on("session_request", onSessionRequest);
      web3Wallet.on("auth_request", onAuthRequest);
      // TODOs
      // web3Wallet.on("session_ping", (data) => console.log("ping", data));
      // web3Wallet.on("session_event", (data) => console.log("event", data));
      // web3Wallet.on("session_update", (data) => console.log("update", data));
      web3Wallet.on("session_delete", (data) => console.log("delete", data));
    }
    return () => {
      web3Wallet.off("session_proposal", onSessionProposal);
      web3Wallet.off("session_request", onSessionRequest);
      web3Wallet.off("auth_request", onAuthRequest);
      // TODOs
      // web3Wallet.on("session_ping", (data) => console.log("ping", data));
      // web3Wallet.on("session_event", (data) => console.log("event", data));
      // web3Wallet.on("session_update", (data) => console.log("update", data));
      web3Wallet.off("session_delete", (data) => console.log("delete", data));
    };
  }, [initialized, onSessionProposal, onSessionRequest, onAuthRequest]);
}
