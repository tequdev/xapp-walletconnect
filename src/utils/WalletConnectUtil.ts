import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";
import { Web3Wallet as TWeb3Wallet } from "@walletconnect/web3wallet/dist/types/client";

const core = new Core({
  projectId: import.meta.env.VITE_PROJECT_ID,
});

export let web3Wallet: TWeb3Wallet;

export async function createWeb3Wallet() {
  web3Wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: "Xumm xApp",
      description: "React Wallet for WalletConnect",
      url: "https://walletconnect.com/",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
  });
}
