import { getFromLocalStorage, setToLocalStorage } from "../local-storage.utils";
import { mocked } from "jest-mock";
import {
  addNewUser,
  updateUserInformations,
  UserStorageKey,
} from "../user-storage.utils";

jest.mock("../local-storage.utils");
const mockedGetFromLocalStorage = mocked(getFromLocalStorage);
const mockedSetToLocalStorage = mocked(setToLocalStorage);

describe("updateUserInformations", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date("2022-04-18").getTime());
  });
  it("should return undefined if getFromLocalStorage return null", () => {
    mockedGetFromLocalStorage.mockReturnValue(null);
    const result = updateUserInformations();
    expect(result).toBeUndefined();
  });
  it("should parse the correct content", () => {
    const initialParse = JSON.parse;
    JSON.parse = jest.fn();
    mockedGetFromLocalStorage.mockReturnValue("{'coucou':'bonjour'}");
    updateUserInformations();
    expect(JSON.parse).toHaveBeenCalledTimes(1);
    expect(JSON.parse).toHaveBeenCalledWith("{'coucou':'bonjour'}");
    JSON.parse = initialParse;
  });
  it("should set to local storage the correct data if the existing value contains already an array for all time connexions", () => {
    mockedGetFromLocalStorage.mockReturnValue(
      JSON.stringify({
        firstName: "Hermione",
        allTimeConnexions: [new Date("1989-07-14")],
      })
    );
    updateUserInformations();
    expect(mockedSetToLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockedSetToLocalStorage).toHaveBeenCalledWith({
      key: UserStorageKey.UserInformations,
      value: JSON.stringify({
        firstName: "Hermione",
        allTimeConnexions: [new Date("1989-07-14"), new Date()],
        lastConnexion: new Date(),
      }),
    });
  });
  it("should set to local storage the correct data if the existing value does not contain an array for all time connexions", () => {
    mockedGetFromLocalStorage.mockReturnValue(
      JSON.stringify({
        firstName: "Hermione",
      })
    );
    updateUserInformations();
    expect(mockedSetToLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockedSetToLocalStorage).toHaveBeenCalledWith({
      key: UserStorageKey.UserInformations,
      value: JSON.stringify({
        firstName: "Hermione",
        lastConnexion: new Date(),
        allTimeConnexions: [new Date()],
      }),
    });
  });
});

describe("addNewUser", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers().setSystemTime(new Date("2022-04-18").getTime());
  });
  it("should return undefined without setting anything to local storage if username is undefined", () => {
    const result = addNewUser(undefined as never);
    expect(result).toBeUndefined();
    expect(mockedSetToLocalStorage).not.toHaveBeenCalled();
  });
  it("should return undefined without setting anything to local storage if username is null", () => {
    const result = addNewUser(null as never);
    expect(result).toBeUndefined();
    expect(mockedSetToLocalStorage).not.toHaveBeenCalled();
  });
  it("should return undefined without setting anything to local storage if username is empty", () => {
    const result = addNewUser("");
    expect(result).toBeUndefined();
    expect(mockedSetToLocalStorage).not.toHaveBeenCalled();
  });
  it("should set to local storage a key with username and a key with user informations", () => {
    addNewUser("Hermione");
    expect(mockedSetToLocalStorage).toHaveBeenCalledTimes(2);
    expect(mockedSetToLocalStorage).toHaveBeenNthCalledWith(1, {
      key: UserStorageKey.UserName,
      value: "Hermione",
    });
    expect(mockedSetToLocalStorage).toHaveBeenNthCalledWith(2, {
      key: UserStorageKey.UserInformations,
      value: JSON.stringify({
        lastConnexion: new Date(),
        allTimeConnexions: [new Date()],
      }),
    });
  });
});
