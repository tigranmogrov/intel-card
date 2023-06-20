import { IState } from "@/types";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import authModule from "./modules/auth";
import userModule from "./modules/user";
import cardModule from "./modules/card";

export const key: InjectionKey<Store<IState>> = Symbol();

export const store = createStore<IState>({
  modules: {
    authModule,
    userModule,
    cardModule,
  },
});

// useStore` composition function

export function useStore() {
  return baseUseStore(key);
}
