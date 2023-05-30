import { XRPL_CHAINS, TXRPLChain } from "@/data/XRPLData";

/**
 * Truncates string (in the middle) via given lenght value
 */
export function truncate(value: string, length: number) {
  if (value?.length <= length) {
    return value;
  }

  const separator = "...";
  const stringLength = length - separator.length;
  const frontLength = Math.ceil(stringLength / 2);
  const backLength = Math.floor(stringLength / 2);

  return (
    value.substring(0, frontLength) +
    separator +
    value.substring(value.length - backLength)
  );
}

/**
 * Get our address from params checking if params string contains one
 * of our wallet addresses
 */
export function getWalletAddressFromParams(addresses: string[], params: any) {
  const paramsString = JSON.stringify(params);
  let address = "";

  addresses.forEach((addr) => {
    if (paramsString.toLowerCase().includes(addr.toLowerCase())) {
      address = addr;
    }
  });

  return address;
}

/**
 * Check if chain is part of XRPL standard
 */
export function isXrplChain(chain: string) {
  return chain.includes("xrpl");
}

/**
 * Formats chainId to its name
 */
export function formatChainName(chainId: string) {
  return (
    XRPL_CHAINS[chainId as TXRPLChain]?.name ??
    chainId
  );
}
