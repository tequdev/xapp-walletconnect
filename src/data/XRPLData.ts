/**
 * Types
 */
export type TXRPLChain = keyof typeof XRPL_MAINNET_CHAINS;

/**
 * Chains
 */
export const XRPL_MAINNET_CHAINS = {
  "xrpl:0": {
    chainId: "xrpl-0",
    name: "XRPL",
    logo: "/chain-logos/cosmos-cosmoshub-4.png",
    rgb: "107, 111, 147",
    rpc: "",
  },
};

export const XRPL_CHAINS = { ...XRPL_MAINNET_CHAINS };

/**
 * Methods
 */
export const XRPL_SIGNING_METHODS = {
  XRPL_SIGN_TRANSACTION: "xrpl_signTransaction",
  XRPL_SIGN_TRANSACTION_FOR: "xrpl_signTransactionFor",
};
