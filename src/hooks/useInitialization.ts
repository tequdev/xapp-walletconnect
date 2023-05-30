import SettingsStore from "@/store/SettingStore"
import { createOrRestoreXrplWallet } from "@/utils/XRPLWalletUtil";
import { createWeb3Wallet, web3Wallet } from "@/utils/WalletConnectUtil";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);
  const prevRelayerURLValue = useRef<string>("");
  
  const { relayerRegionURL } = useSnapshot(SettingsStore.state);

  const onInitialize = useCallback(async () => {
    try {
      const { xrplAddresses } = await createOrRestoreXrplWallet();
      SettingsStore.setXrplAddress(xrplAddresses[0]);
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: unknown) {
      alert(err);
    }
  }, []);

  // restart transport if relayer region changes
  const onRelayerRegionChange = useCallback(() => {
    try {
      web3Wallet.core.relayer.restartTransport(relayerRegionURL);
      prevRelayerURLValue.current = relayerRegionURL;
    } catch (err: unknown) {
      alert(err);
    }
  }, [relayerRegionURL]);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }else  if (prevRelayerURLValue.current !== relayerRegionURL) {
      onRelayerRegionChange();
    }
  }, [initialized, onInitialize, relayerRegionURL, onRelayerRegionChange]);

  return initialized;
}
