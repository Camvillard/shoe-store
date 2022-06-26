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

const updateUserInformations = () => {
  const existingUserInformations = getFromLocalStorage(
    UserStorageKey.UserInformations
  );
  if (!existingUserInformations) return;
  const existingValue = JSON.parse(existingUserInformations);

  const allTimeConnexions = existingValue.allTimeConnexions
    ? [...existingValue.allTimeConnexions, new Date()]
    : [new Date()];

  const newData = {
    lastConnexion: new Date(),
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

const addNewUser = (userName: string) => {
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
