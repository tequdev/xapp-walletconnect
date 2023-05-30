import XrplLib from "@/lib/XrplLib";

export let wallet1: XrplLib;
export let wallet2: XrplLib;
export let xrplWallets: Record<string, XrplLib>;
export let xrplAddresses: string[];

let address1: string;

/**
 * Utilities
 */
export async function createOrRestoreXrplWallet() {
  wallet1 = XrplLib.init();
  address1 = await XrplLib.getAddress();

  xrplWallets = {
    [address1]: XrplLib.init(),
  };
  xrplAddresses = Object.keys(xrplWallets);

  return {
    xrplWallets,
    xrplAddresses,
  };
}
