import { GetterTree } from "vuex";
import { IUserState, IState } from "@/types";

export const getters: GetterTree<IUserState, IState> = {
  user: (state: IUserState) => state.user,
};
