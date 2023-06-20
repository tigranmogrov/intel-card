import { MutationTree } from "vuex";
import { ICardStateTypes, ICardGroupsTypes } from "@/types";

export const mutations: MutationTree<ICardStateTypes> = {
  SET_CARDS(state: ICardStateTypes, payload: ICardGroupsTypes[]) {
    state.cardGroups = payload;
  },
  SET_WORDS(state: ICardStateTypes, payload) {
    state.cardWords = payload;
  },
};
