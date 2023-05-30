import { proxy } from "valtio";

/**
 * Types
 */
interface State {
  testNets: boolean;
  account: number;
  xrplAddress: string;
  relayerRegionURL: string;
}

/**
 * State
 */
const state = proxy<State>({
  testNets:
    typeof localStorage !== "undefined"
      ? Boolean(localStorage.getItem("TEST_NETS"))
      : true,
  account: 0,
  xrplAddress: "",
  relayerRegionURL: import.meta.env.VITE_RELAY_URL || "",
});

/**
 * Store / Actions
 */
const SettingsStore = {
  state,

  setAccount(value: number) {
    state.account = value;
  },

  setXrplAddress(xrplAddresses: string) {
    state.xrplAddress = xrplAddresses;
  },

  setRelayerRegionURL(relayerRegionURL: string) {
    state.relayerRegionURL = relayerRegionURL;
  },

  toggleTestNets() {
    state.testNets = !state.testNets;
    if (state.testNets) {
      localStorage.setItem("TEST_NETS", "YES");
    } else {
      localStorage.removeItem("TEST_NETS");
    }
  },
};

export default SettingsStore;
