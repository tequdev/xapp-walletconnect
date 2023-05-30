import { XRPL_SIGNING_METHODS } from "@/data/XRPLData";
import { formatJsonRpcError, formatJsonRpcResult } from "@json-rpc-tools/utils";
import { getSdkError } from "@walletconnect/utils";
import { Web3WalletTypes } from "@walletconnect/web3wallet";
import XrplLib from "@/lib/XrplLib";

export async function approveXrplRequest(
  requestEvent: Web3WalletTypes.EventArguments["session_request"]
) {
  const { params, id } = requestEvent;
  const { request } = params;
  // const wallet = xrplWallets[getWalletAddressFromParams(xrplAddresses, params)];
  
  switch (request.method) {
    case XRPL_SIGNING_METHODS.XRPL_SIGN_TRANSACTION:
      // eslint-disable-next-line no-case-declarations
      const signedTransaction = await XrplLib.signTransaction(
        request.params.tx_json
      );
      return formatJsonRpcResult(id, signedTransaction);

    case XRPL_SIGNING_METHODS.XRPL_SIGN_TRANSACTION_FOR:
      // eslint-disable-next-line no-case-declarations
      const signedTransactionFor = await XrplLib.signTransactionFor(
        request.params.tx_json
      );
      return formatJsonRpcResult(id, signedTransactionFor);

    default:
      throw new Error(getSdkError("INVALID_METHOD").message);
  }
}

export function rejectXrplRequest(
  request: Web3WalletTypes.EventArguments["session_request"]
) {
  const { id } = request;

  return formatJsonRpcError(id, getSdkError("USER_REJECTED_METHODS").message);
}
