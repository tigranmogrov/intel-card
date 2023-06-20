import { Timestamp } from "firebase/firestore";

export interface ICardGroupsTypes {
  _id: string;
  createdAt: Timestamp;
  name: string;
  wordsCount: number;
  wordsLearnedCount: number;
}
