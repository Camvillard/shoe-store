import { Dispatch } from "react";
import { ActionData, UserActionsType } from "./user-context.actions";

export type UserData = {
  userName: string;
  firstName: string;
  keepConnected: boolean;
  lastConnexion?: Date;
  allTimeConnexions?: Array<Date>;
};

export type UserGlobalContextState = {
  state: UserContextData;
  dispatch?: Dispatch<ActionData<UserActionsType, UserData>>;
};

export type UserContextData = {
  isLoggedIn: boolean;
  user?: UserData;
};
