import { GetterTree } from "vuex";
import { ICardGettersStoreStateTypes, IState } from "@/types";

export const getters: GetterTree<ICardGettersStoreStateTypes, IState> = {
  cardGroups: (state: ICardGettersStoreStateTypes) =>
    state.cardGroups.reverse(),
  cardWordsDefault: (state: any) =>
    state.cardWords.filter((el) => !el.isLearned).reverse(),
  cardWordsCompleted: (state: any) =>
    state.cardWords.filter((el) => el.isLearned).reverse(),
};
