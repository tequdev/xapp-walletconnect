import { SessionTypes } from "@walletconnect/types";
import { Web3WalletTypes } from "@walletconnect/web3wallet";
import { proxy } from "valtio";

/**
 * Types
 */
interface ModalData {
  proposal?: Web3WalletTypes.EventArguments["session_proposal"];
  requestEvent?: Web3WalletTypes.EventArguments["session_request"];
  requestSession?: SessionTypes.Struct;
  request?: Web3WalletTypes.AuthRequest;
}

interface State {
  open: boolean;
  view?:
    | "SessionProposalModal"
    | "SessionSignModal"
    | "SessionSignTypedDataModal"
    | "SessionSendTransactionModal"
    | "SessionUnsuportedMethodModal"
    | "AuthRequestModal"
    | "SessionSignXrplModal";
  data?: ModalData;
}

/**
 * State
 */
const state = proxy<State>({
  open: false,
});

/**
 * Store / Actions
 */
const ModalStore = {
  state,

  open(view: State["view"], data: State["data"]) {
    state.view = view;
    state.data = data;
    state.open = true;
  },

  close() {
    state.open = false;
  },
};

export default ModalStore;
