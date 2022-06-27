import { render, screen } from "@testing-library/react";
import { mockSale, mockSales } from "../../../mocks/sale.mock";
import Dashboard from "../Dashboard.component";

jest.mock("../../sales/sales-by-store/SalesByStore.component", () => () => {
  const mockedSalesByStore = <div>mocked sales by store</div>;
  return mockedSalesByStore;
});

jest.mock("../../sales/new-sale/NewSale.component", () => () => {
  const newSale = <div>mocked new Sale</div>;
  return newSale;
});

const allSales = mockSales();
const lastSale = mockSale();
const salesByModel = {
  "Model 1": mockSales([
    mockSale({ model: "CADEVEN", store: "ALDO Centre Eaton" }),
  ]),
  "Model 2": mockSales([
    mockSale({ model: "GRELIDIEN", store: "ALDO Burlington Mall" }),
  ]),
};
const salesByStore = {
  "Store 1": mockSales([mockSale({ model: "BUTAUD" })]),
  undefined,
  "Store 2": mockSales([
    mockSale({ model: "WUMA", store: "ALDO Maine Mall" }),
    mockSale({ model: "GREG", store: "ALDO Holyoke Mall" }),
  ]),
};

describe("Dashboard component", () => {
  it("should render a dashboard with as many SalesByStore components as specified in props", () => {
    render(
      <Dashboard
        allSales={allSales}
        connectionStatus={"Ready"}
        lastSale={lastSale}
        salesByModel={salesByModel}
        salesByStore={salesByStore as never}
      />
    );
    const allyStore = screen.getAllByText("mocked sales by store");
    expect(allyStore).toHaveLength(2);
  });
  it("should have a status text", () => {
    render(
      <Dashboard
        allSales={allSales}
        connectionStatus={"Ready"}
        lastSale={lastSale}
        salesByModel={salesByModel}
        salesByStore={salesByStore as never}
      />
    );
    const status = screen.getByTestId("Dashboard_status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent("Ready");
  });
  it("should contain a NewSale component if there is a new sale to display", () => {
    render(
      <Dashboard
        allSales={allSales}
        connectionStatus={"Ready"}
        lastSale={lastSale}
        salesByModel={salesByModel}
        salesByStore={salesByStore as never}
      />
    );
    const newSale = screen.getByText("mocked new Sale");
    expect(newSale).toBeInTheDocument();
  });
  it("should not contain a NewSale component if there is no new sale to display", () => {
    render(
      <Dashboard
        allSales={allSales}
        connectionStatus={"Ready"}
        lastSale={undefined as never}
        salesByModel={salesByModel}
        salesByStore={salesByStore as never}
      />
    );
    const newSale = screen.queryByText("mocked new Sale");
    expect(newSale).not.toBeInTheDocument();
  });
});
