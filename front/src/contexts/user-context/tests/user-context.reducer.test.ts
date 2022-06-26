import { mocked } from "jest-mock";

import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../../shared/storage/user-storage.utils";

import { UserActionsType } from "../user-context.actions";
import { loginUser, logoutUser, userReducer } from "../user-context.reducer";

jest.mock("../../../shared/storage/user-storage.utils");
const mockedAddUserToLocalStorage = mocked(addUserToLocalStorage);
const mockedRemoveUserFromLocalStorage = mocked(removeUserFromLocalStorage);

const defaultUser = {
  userName: "Ron",
  firstName: "Ronald",
  keepConnected: true,
};

describe("loginUser", () => {
  it("should return an action with 'Login' as type and the user as payload", () => {
    const result = loginUser(defaultUser);
    expect(result).toStrictEqual({
      type: UserActionsType.Login,
      payload: defaultUser,
    });
  });
});

describe("logoutUser", () => {
  it("should return an action with 'Login' as type and no payload", () => {
    const result = logoutUser();
    expect(result).toStrictEqual({
      type: UserActionsType.Logout,
    });
  });
});

describe("userReducer", () => {
  it("should return default state if no action is matched", () => {
    const result = userReducer(
      {
        isLoggedIn: false,
      },
      { type: "another action" } as never
    );
    expect(result).toStrictEqual({ isLoggedIn: false });
  });
  it("should return a new loggedIn state if action is Login", () => {
    const result = userReducer(
      {
        isLoggedIn: false,
      },
      {
        type: UserActionsType.Login,
        payload: defaultUser,
      }
    );
    expect(result).toStrictEqual({
      isLoggedIn: true,
      user: defaultUser,
    });
  });
  it("should add user to local storage if action is Login and payload exists", () => {
    userReducer(
      {
        isLoggedIn: false,
      },
      {
        type: UserActionsType.Login,
        payload: defaultUser,
      }
    );
    expect(mockedAddUserToLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockedAddUserToLocalStorage).toHaveBeenCalledWith(defaultUser);
  });
  it("should not add user to local storage if action is Login but payload does not exist", () => {
    userReducer(
      {
        isLoggedIn: false,
      },
      {
        type: UserActionsType.Login,
        payload: undefined,
      }
    );
    expect(mockedAddUserToLocalStorage).not.toHaveBeenCalled();
  });
  it("should return a new loggedOut state if action is Logout adn remove user from storage", () => {
    const result = userReducer(
      {
        isLoggedIn: true,
      },
      {
        type: UserActionsType.Logout,
      }
    );
    expect(result).toStrictEqual({
      isLoggedIn: false,
      user: undefined,
    });
    expect(mockedRemoveUserFromLocalStorage).toHaveBeenCalledTimes(1);
  });
});
