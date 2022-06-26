import { UserData } from "../../contexts/user-context/user-context.type";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "./local-storage.utils";

export enum UserStorageKey {
  UserInformations = "user_informations",
  UserName = "user_name",
}

export const updateUserInformations = () => {
  const existingUserInformations = getFromLocalStorage(
    UserStorageKey.UserInformations
  );
  if (!existingUserInformations) return;

  const existingValue = JSON.parse(existingUserInformations);
  const today = new Date();
  const allTimeConnexions = existingValue?.allTimeConnexions
    ? [...existingValue.allTimeConnexions, today]
    : [today];

  const newData = {
    lastConnexion: today,
    allTimeConnexions,
  };

  setToLocalStorage({
    key: UserStorageKey.UserInformations,
    value: JSON.stringify({
      ...existingValue,
      ...newData,
    }),
  });
};

export const addNewUser = (userName: string) => {
  if (!userName) return;
  setToLocalStorage({ key: UserStorageKey.UserName, value: userName });
  setToLocalStorage({
    key: UserStorageKey.UserInformations,
    value: JSON.stringify({
      lastConnexion: new Date(),
      allTimeConnexions: [new Date()],
    }),
  });
};

export const addUserToLocalStorage = ({ userName }: UserData) => {
  const existingUserName = getFromLocalStorage(UserStorageKey.UserName);
  if (existingUserName === userName) {
    updateUserInformations();
  } else {
    addNewUser(userName);
  }
};

export const removeUserFromLocalStorage = () => {
  Object.keys(UserStorageKey).forEach((userKey) =>
    removeFromLocalStorage(userKey)
  );
};
