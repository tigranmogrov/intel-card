import { IAuth, ICardStateTypes, IUserState } from "@/types";

export interface IState {
  authModule: IAuth;
  userModule: IUserState;
  cardModule: ICardStateTypes;
}
