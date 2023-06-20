import { getters } from "./card.getters";
import { actions } from "./card.actions";
import { mutations } from "./card.mutations";
import { state } from "./state";

// Module
const cardModule = {
  state,
  getters,
  mutations,
  actions,
};

export default cardModule;
