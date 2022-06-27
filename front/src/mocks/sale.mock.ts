import { SaleData } from "../components/sales/sale.type";

export const mockSale = (mockOptions?: Partial<SaleData>): SaleData => ({
  date: new Date("2022-06-25").toLocaleDateString(),
  inventory: 3,
  model: "ABOEN",
  store: "ALDO Waterloo Premium Outlets",
  ...mockOptions,
});

export const mockSales = (mockOptions?: SaleData[]) => [
  mockSale(),
  mockSale({
    date: new Date("2022-06-25").toLocaleDateString(),
    inventory: 23,
    model: "RASIEN",
    store: "ALDO Destiny USA Mall",
  }),
  mockSale({
    date: new Date("2022-06-26").toLocaleDateString(),
    inventory: 61,
    model: "BOZZA",
    store: "ALDO Crossgates Mall",
  }),
  ...(mockOptions || []),
];
