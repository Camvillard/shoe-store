import { createContext, ReactNode, useEffect, useReducer } from "react";

import { getFromLocalStorage } from "../../shared/storage/local-storage.utils";
import { UserStorageKey } from "../../shared/storage/user-storage.utils";

import { loginUser, userReducer } from "./user-context.reducer";
import { UserContextData, UserGlobalContextState } from "./user-context.type";

type Props = {
  children: ReactNode;
  initialContextValue?: UserContextData;
};

export const initialUserContext = {
  isLoggedIn: false,
};

export const UserContext = createContext<UserGlobalContextState>({
  state: initialUserContext,
});

const UserContextProvider = ({ children, initialContextValue }: Props) => {
  const [globalState, dispatch] = useReducer(
    userReducer,
    initialContextValue || initialUserContext
  );

  useEffect(() => {
    const existingUser = getFromLocalStorage(UserStorageKey.UserName);
    existingUser &&
      dispatch(
        loginUser({
          userName: existingUser,
          firstName: "",
          keepConnected: true,
        })
      );
  }, []);

  return (
    <UserContext.Provider value={{ state: globalState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
