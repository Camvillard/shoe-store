import { render, screen } from "@testing-library/react";
import { mockSales } from "../../../../mocks/sale.mock";
import View from "../View.component";

describe("View component", () => {
  it("should render a view with multiple detailLines", () => {
    render(<View data={mockSales()} isInventory />);
    const allDetailLines = screen.getAllByTestId("View_detailLine");
    expect(allDetailLines).toHaveLength(3);
  });
  it("should display an inventory if isInventory is true", () => {
    render(<View data={mockSales()} isInventory />);
    const allInventoryLines = screen.getAllByTestId("View_inventory");
    expect(allInventoryLines[0]).toHaveTextContent("3");
    expect(allInventoryLines[1]).toHaveTextContent("23");
    expect(allInventoryLines[2]).toHaveTextContent("61");
  });
  it("should display a number of sales if isInventory is false", () => {
    render(<View data={mockSales()} isInventory={false} />);
    const allInventoryLines = screen.getAllByTestId("View_inventory");
    expect(allInventoryLines[0]).toHaveTextContent("97");
    expect(allInventoryLines[1]).toHaveTextContent("77");
    expect(allInventoryLines[2]).toHaveTextContent("39");
  });
});
