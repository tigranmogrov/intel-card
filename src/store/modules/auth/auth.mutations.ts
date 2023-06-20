import { MutationTree } from "vuex";
import { IAuth } from "@/types";

export const mutations: MutationTree<IAuth> = {
  SET_AUTH(state: IAuth, payload: boolean) {
    state.isLoggedIn = payload;
  },
};
