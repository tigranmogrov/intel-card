import { Timestamp } from "firebase/firestore";

export interface ICardWordsTypes {
  _id: string;
  createdAt: Timestamp;
  title: string;
  translated: string;
  description: string;
  isLearned: boolean;
}
