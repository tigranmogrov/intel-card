import { ActionTree } from "vuex";

import { IAuth, IState } from "@/types";
// import router from "@/router";

export const actions: ActionTree<IAuth, IState> = {
  async setAuth({ commit }, payload: boolean) {
    commit("SET_AUTH", payload);
  },
};
