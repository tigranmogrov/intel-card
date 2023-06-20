import { GetterTree } from "vuex";
import { IAuth, IState } from "@/types";

export const getters: GetterTree<IAuth, IState> = {
  isAuthenticated: (state: IAuth) => state.isLoggedIn,
};
