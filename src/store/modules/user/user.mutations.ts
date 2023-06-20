import { MutationTree } from "vuex";
import { IUserState, IUser } from "@/types";

export const mutations: MutationTree<IUserState> = {
  SET_USER_INFO(state: IUserState, payload: IUser) {
    state.user = payload;
  },

  REMOVE_USER(state) {
    state.user = {};
  },
};
