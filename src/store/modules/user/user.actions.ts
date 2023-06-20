import { ActionTree } from "vuex";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { IUserCreateTypes, IUserState, IState, IUser } from "@/types";

export const actions: ActionTree<IUserState, IState> = {
  async createUser({ dispatch }, { name, email, password }: IUserCreateTypes) {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        ({ user }) => {
          updateProfile(user, { displayName: name }).then(() => {
            dispatch("getDbInfo");
            if (user.displayName !== "") {
              dispatch("setAuth", true);
            }
          });
        }
      );
    } catch (e) {
      throw e;
    }
  },

  async login({ dispatch }, { email, password }: IUserCreateTypes) {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        if (user) {
          dispatch("setAuth", true);
        }
      });
    } catch (e) {
      throw e;
    }
  },

  async logout({ dispatch, commit }) {
    try {
      await signOut(auth)
        .then(() => {
          dispatch("setAuth", false);
          commit("REMOVE_USER");
        })
        .catch((error) => {
          throw error;
        });
    } catch (e) {
      throw e;
    }
  },

  async getDbInfo({ dispatch, commit }) {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo: IUser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };
        commit("SET_USER_INFO", userInfo);
        dispatch("setAuth", true);
      }
    });
  },

  getUid(): string | null {
    const user = auth.currentUser;
    return user ? user.uid : null;
  },
};
