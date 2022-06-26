import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../shared/storage/user-storage.utils";
import { ActionData, UserActionsType } from "./user-context.actions";
import { UserContextData, UserData } from "./user-context.type";
import { initialUserContext } from "./UserContextProvider.component";

export const loginUser = (user: UserData) => ({
  type: UserActionsType.Login,
  payload: user,
});

export const logoutUser = () => ({
  type: UserActionsType.Logout,
});

export const userReducer = (
  state = initialUserContext,
  action: ActionData<UserActionsType, UserData>
): UserContextData => {
  if (action.type === UserActionsType.Login) {
    action.payload && addUserToLocalStorage(action.payload);
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload,
    };
  }
  if (action.type === UserActionsType.Logout) {
    removeUserFromLocalStorage();
    return {
      ...state,
      isLoggedIn: false,
      user: undefined,
    };
  }
  return state;
};
