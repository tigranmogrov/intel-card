import { ActionTree } from "vuex";
import {
  setDoc,
  doc,
  Timestamp,
  collection,
  query,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import {
  ICardGroupsTypes,
  ICardStateTypes,
  ICardWordsTypes,
  IState,
} from "@/types";
import { database } from "@/firebase/firebase";
import { isExistsDoc } from "@/utils";

export const actions: ActionTree<ICardStateTypes, IState> = {
  async createCardGroup({ dispatch }, { title }) {
    try {
      const uid = await dispatch("getUid");
      const data: ICardGroupsTypes = {
        _id: title.toLowerCase(),
        createdAt: Timestamp.now(),
        name: title,
        wordsCount: 0,
        wordsLearnedCount: 0,
      };

      const isExists: boolean = await isExistsDoc(
        uid,
        "card-groups",
        "groups",
        title.toLowerCase()
      );
      if (isExists) {
        await Promise.reject(Error(`The  --${title}-- group exists`));
      }

      const reviewRef = doc(
        collection(database, uid, "card-groups", "groups"),
        `${title.toLowerCase()}`
      );

      await setDoc(reviewRef, data).then(() => {
        dispatch("getCardGroups");
      });
    } catch (e) {
      throw e;
    }
  },

  async getCardGroups({ dispatch, commit }) {
    try {
      const uid = await dispatch("getUid");
      const data: ICardGroupsTypes[] = [];
      const q = query(
        collection(database, uid, "card-groups", "groups"),
        orderBy("createdAt")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(<ICardGroupsTypes>doc.data());
      });
      await commit("SET_CARDS", data);
    } catch (e) {
      throw e;
    }
  },

  async updateCardGroupsLearnedCount({ dispatch }, groupName: string) {
    try {
      const uid = await dispatch("getUid");
      const q = query(collection(database, uid, "card-groups", "groups"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data()._id === groupName.toLowerCase()) {
          updateDoc(doc.ref, {
            wordsLearnedCount: doc.data().wordsLearnedCount + 1,
          });
        }
      });
      // await dispatch("getCardWords", payload.groupName);
    } catch (e) {
      throw e;
    }
  },

  async createWord(
    { dispatch },
    { wordValue: { originalTitle, translateTitle, description }, groupName }
  ) {
    try {
      const uid = await dispatch("getUid");
      const isExists: boolean = await isExistsDoc(
        uid,
        "card-words",
        groupName.toLowerCase(),
        originalTitle
      );
      const data: ICardWordsTypes = {
        _id: originalTitle.toLowerCase(),
        createdAt: Timestamp.now(),
        title: originalTitle,
        translated: translateTitle,
        description: description,
        isLearned: false,
      };

      if (isExists) {
        await Promise.reject(Error(`The  --${originalTitle}--  word exists`));
      }

      const reviewRef = doc(
        collection(database, uid, "card-words", groupName.toLowerCase()),
        originalTitle.toLowerCase()
      );

      await setDoc(reviewRef, data).then(async () => {
        dispatch("getCardWords", groupName.toLowerCase());
        const q = query(
          collection(database, uid, "card-groups", "groups"),
          orderBy("createdAt")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.id === groupName.toLowerCase()) {
            updateDoc(doc.ref, {
              wordsCount: doc.data().wordsCount + 1,
            });
          }
        });
      });
    } catch (e) {
      throw e;
    }
  },

  async getCardWords({ dispatch, commit }, groupName: string) {
    try {
      const data: ICardWordsTypes[] = [];
      const uid = await dispatch("getUid");
      const q = query(
        collection(database, uid, "card-words", groupName.toLowerCase()),
        orderBy("createdAt")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(<ICardWordsTypes>doc.data());
      });
      await commit("SET_WORDS", data);
    } catch (e) {
      throw e;
    }
  },

  async updateCardWords({ dispatch }, payload) {
    try {
      const uid = await dispatch("getUid");
      const q = query(
        collection(database, uid, "card-words", payload.groupName.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data()._id === payload.word.toLowerCase()) {
          updateDoc(doc.ref, {
            isLearned: true,
          });
        }
      });
      await dispatch("getCardWords", payload.groupName);
    } catch (e) {
      throw e;
    }
  },
};
