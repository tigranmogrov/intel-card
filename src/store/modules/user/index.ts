import { getters } from "./user.getters";
import { actions } from "./user.actions";
import { mutations } from "./user.mutations";
import { state } from "./state";

// Module
const userModule = {
  state,
  getters,
  mutations,
  actions,
};

export default userModule;
