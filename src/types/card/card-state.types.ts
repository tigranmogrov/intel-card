import { ICardGroupsTypes, ICardWordsTypes } from "@/types";

export interface ICardStateTypes {
  cardGroups: ICardGroupsTypes[] | [];
  cardWords: ICardWordsTypes[] | [];
}

export interface ICardGettersStoreStateTypes {
  cardGroups: ICardGroupsTypes[] | [];
  cardWordsDefault: ICardWordsTypes[] | [];
  cardWordsCompleted: ICardWordsTypes[] | [];
}
