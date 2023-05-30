import "./App.css";
import useWalletConnectEventsManager from "./hooks/useWalletConnectEventsManager";
import useInitialization from "@/hooks/useInitialization";
import WalletConnect from "./pages/WalletConnect";
import Modal from "./components/Modal";
import { Text } from "@nextui-org/react";

function App() {
  // Step 1 - Initialize wallets and wallet connect client
  const initialized = useInitialization();

  // Step 2 - Once initialized, set up wallet connect event manager
  useWalletConnectEventsManager(initialized);

  if (!initialized) {
    return <></>;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Text
        h2
        css={{
          textGradient: "75deg, $blue600 -40%, $green600 100%",
        }}
      >
        Connect Wallet
      </Text>
      <WalletConnect />
      <Modal />
    </div>
  );
}

export default App;
