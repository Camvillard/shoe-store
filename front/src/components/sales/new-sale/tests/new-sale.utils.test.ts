import { replaceStockValues, replaceSubTitleValues } from "../new-sale.utils";

describe("replaceSubTitleValues", () => {
  it("should return a new sentence with replaced words", () => {
    const result = replaceSubTitleValues({
      store: "Centre Eaton",
      model: "Ava",
      subTitle: "I am #STORE and I sell some #MODEL",
    });
    expect(result).toStrictEqual("I am Centre Eaton and I sell some Ava");
  });
  it("should not replace anything if there is nothing to replace", () => {
    const result = replaceSubTitleValues({
      store: "Centre Eaton",
      model: "Ava",
      subTitle: "nothing is matching",
    });
    expect(result).toStrictEqual("nothing is matching");
  });
  it("should be undefined if subtitle is undefined", () => {
    const result = replaceSubTitleValues({
      store: "Centre Eaton",
      model: "Ava",
    } as never);
    expect(result).toBeUndefined();
  });
});

describe("replaceStockValues", () => {
  it("should return a new sentence with replaced words for a stock > 1", () => {
    const result = replaceStockValues({
      inventory: 34,
      stockTitle: "there #VERB #STOCK pair#PLURAL in stock.",
    });
    expect(result).toStrictEqual("there are 34 pairs in stock.");
  });
  it("should return a new sentence with replaced words for a stock === 1", () => {
    const result = replaceStockValues({
      inventory: 1,
      stockTitle: "there #VERB #STOCK pair#PLURAL in stock.",
    });
    expect(result).toStrictEqual("there is 1 pair in stock.");
  });
  it("should not replace anything if there is nothing to replace", () => {
    const result = replaceStockValues({
      inventory: 1,
      stockTitle: "there is nothing to replace sorry",
    });
    expect(result).toStrictEqual("there is nothing to replace sorry");
  });
  it("should be undefined if stockTitle is undefined", () => {
    const result = replaceStockValues({
      inventory: 1,
    } as never);
    expect(result).toBeUndefined();
  });
});
