import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import useWebSocket from "react-use-websocket";

import { mockSale } from "../../../mocks/sale.mock";
import DashboardContainer from "../Dashboard.container";

const mockCheckProps = jest.fn();

jest.mock("../Dashboard.component", () => (props: unknown) => {
  mockCheckProps(props);
  const MockedDashboard = <div>mocked dashboard component</div>;
  return MockedDashboard;
});

jest.mock("react-use-websocket");
const mockedUseWebsocket = mocked(useWebSocket);

const defaultSale = mockSale();

describe("Dashboard container", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseWebsocket.mockReturnValue({
      lastJsonMessage: defaultSale,
      readyState: 2,
    } as never);
  });
  it("should render a Dashboard component with correct props", () => {
    render(<DashboardContainer />);
    const dashboard = screen.getByText("mocked dashboard component");
    expect(dashboard).toBeInTheDocument();
    expect(mockCheckProps).toHaveBeenCalledWith(
      expect.objectContaining({
        connectionStatus: "Closing",
        lastSale: defaultSale,
      })
    );
  });
});
