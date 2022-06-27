import { SaleData } from "../sale.type";

export const replaceSubTitleValues = ({
  store,
  model,
  subTitle,
}: Pick<SaleData, "store" | "model"> & { subTitle: string }) => {
  return subTitle?.replace("#STORE", store).replace("#MODEL", model);
};

export const replaceStockValues = ({
  inventory,
  stockTitle,
}: Pick<SaleData, "inventory"> & { stockTitle: string }) => {
  return stockTitle
    ?.replace("#STOCK", `${inventory}`)
    .replace("#VERB", inventory > 1 ? "are" : "is")
    .replace("#PLURAL", inventory > 1 ? "s" : "");
};
