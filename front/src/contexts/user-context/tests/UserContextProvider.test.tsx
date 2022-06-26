import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import { getFromLocalStorage } from "../../../shared/storage/local-storage.utils";
import { UserStorageKey } from "../../../shared/storage/user-storage.utils";

import { loginUser } from "../user-context.reducer";
import UserContextProvider from "../UserContextProvider.component";

jest.mock("../../../shared/storage/local-storage.utils");
const mockedGetFromLocalStorage = mocked(getFromLocalStorage);

jest.mock("../user-context.reducer");
const mockedLoginUser = mocked(loginUser);

const setup = () => {
  render(
    <UserContextProvider>
      <p>coucou</p>
    </UserContextProvider>
  );
};

describe("UserContextProvider", () => {
  beforeEach(() => jest.resetAllMocks());
  it("should render a context with children", () => {
    setup();

    const children = screen.getByText("coucou");
    expect(children).toBeInTheDocument();
  });
  it("should get user name from local storage", () => {
    setup();

    expect(mockedGetFromLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(
      UserStorageKey.UserName
    );
  });
  it("should login user if there is already a username stored", () => {
    mockedGetFromLocalStorage.mockReturnValue("HarryGlasses");
    setup();

    expect(mockedLoginUser).toHaveBeenCalledTimes(1);
    expect(mockedLoginUser).toHaveBeenCalledWith({
      userName: "HarryGlasses",
      firstName: "",
      keepConnected: true,
    });
  });
});
