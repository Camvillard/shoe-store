import React from "react";
import { render, screen } from "@testing-library/react";
import { mockSales } from "../../../../mocks/sale.mock";
import { SaleModuleView } from "../../sale.type";
import { SALES_BY_STORE_CONTENT } from "../sales-by-store.content";
import SalesByStore from "../SalesByStore.component";

const salesData = mockSales();

const { labelViewInventory, switchLabelInventory } = SALES_BY_STORE_CONTENT;

const mockCheckProps = jest.fn();

jest.mock("../../sales-module/SalesModule.component", () => () => {
  const mockedSalesModule = <div>mocked sales module</div>;
  return mockedSalesModule;
});

jest.mock("../View.component", () => (props: any) => {
  mockCheckProps(props);
  const mockedView = <div>mocked view</div>;
  return mockedView;
});

describe("SalesByStore component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([SaleModuleView.Inventory, jest.fn()])
      .mockReturnValueOnce([switchLabelInventory, jest.fn()])
      .mockReturnValue([labelViewInventory, jest.fn()]);
  });
  it("should be empty if data is undefined", () => {
    const { container } = render(
      <SalesByStore data={undefined as never} storeName="Centre Eaton" />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it("should be empty if data is null", () => {
    const { container } = render(
      <SalesByStore data={null as never} storeName="Centre Eaton" />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it("should render a SalesModule component", () => {
    render(<SalesByStore data={salesData} storeName="Centre Eaton" />);
    const salesModule = screen.getByText("mocked sales module");
    expect(salesModule).toBeInTheDocument();
  });
  it("should render the correct view is current view is Inventory", () => {
    render(<SalesByStore data={salesData} storeName="Centre Eaton" />);
    expect(mockCheckProps).toHaveBeenCalledWith({
      data: salesData,
      isInventory: true,
    });
  });
});

//TODO: undestand why this is workig only when isolated in a separate describe
describe("should render the correct view is current view is Sales", () => {
  it("should render the correct view is current view is Sales", () => {
    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([SaleModuleView.Sales, jest.fn()])
      .mockReturnValueOnce([switchLabelInventory, jest.fn()])
      .mockReturnValue([labelViewInventory, jest.fn()]);
    render(<SalesByStore data={salesData} storeName="Centre Eaton" />);
    expect(mockCheckProps).toHaveBeenCalledWith({
      data: salesData,
      isInventory: false,
    });
  });
});
