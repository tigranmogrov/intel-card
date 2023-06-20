import { getters } from "./auth.getters";
import { actions } from "./auth.actions";
import { mutations } from "./auth.mutations";
import { state } from "./state";

// Module
const authModule = {
  state,
  getters,
  mutations,
  actions,
};

export default authModule;
