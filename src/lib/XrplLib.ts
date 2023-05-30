import { getSdkError } from '@walletconnect/utils';
import { xumm } from "@/store/XummStore";

/**
 * Types
 */
type TxJSON = Record<string, unknown> & {
  TransactionType: string;
};

type SignTransactionOption = { submit: boolean, autofill: boolean }

/**
 * Library
 */
export default class XrplLib {
  static init() {
    return new XrplLib();
  }

  public static async getAddress() {
    // await xumm.environment.ready;
    const account = await xumm.user.account;
    if (!account) {
      throw new Error("No account found");
    }
    return account;
  }

  public static async signTransaction(
    txjson: TxJSON,
    option?: SignTransactionOption
  ) {
    return this._signTransactionFor(txjson, false, option)
  }

  public static async signTransactionFor(
    txjson: TxJSON,
    option?: SignTransactionOption
  ) {
    return this._signTransactionFor(txjson, true, option)
  }

  private static async _signTransactionFor(
    txjson: TxJSON,
    multisign: boolean,
    option?: SignTransactionOption
  ) {
    const payload = await xumm.payload?.create({
      txjson: txjson as any,
      options: {
        submit: option?.submit || true,
        multisign: multisign
      },
    });
    if (!payload) {
      throw new Error("Invalid tx_json");
    }
    await xumm.xapp?.openSignRequest({
      uuid: payload.uuid,
    });
    await new Promise<void>((resolve, reject) => {
      xumm.xapp?.on("payload", async (openedPayload) => {
        if (openedPayload.reason === "SIGNED") resolve();
        if (openedPayload.reason === "DECLINED") {
          await xumm.payload?.cancel(payload.uuid);
          reject(getSdkError("USER_REJECTED"));
        }
      });
    });
    const tx = await xumm.payload?.get(payload.uuid);
    return tx?.payload.request_json;
  }
}
