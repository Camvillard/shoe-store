export type SaleData = {
  date: string;
  inventory: number;
  model: string;
  store: string;
};

export enum SaleModuleView {
  Inventory,
  Sales,
}
