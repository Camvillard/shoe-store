import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import React from "react";
import { mockSale } from "../../../../mocks/sale.mock";
import { replaceStockValues, replaceSubTitleValues } from "../new-sale.utils";
import NewSale from "../NewSale.component";

jest.mock("../new-sale.utils");
const mockedReplaceSubTitleValues = mocked(replaceSubTitleValues);
const mockedReplaceStockValues = mocked(replaceStockValues);

describe("NewSale component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    jest.resetAllMocks();
    jest.spyOn(React, "useState").mockImplementation(() => [true, jest.fn()]);
  });
  it("should render a component if displayNotification is true", () => {
    const setStateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [true, setStateMock]);
    const { container } = render(<NewSale data={mockSale()} />);

    const wrapper = screen.getByTestId("NewSale_wrapper");

    expect(container).not.toBeEmptyDOMElement();
    expect(wrapper).toBeInTheDocument();
  });
  it("should be empty if displayNotification is false", () => {
    const setStateMock = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [false, setStateMock]);
    const { container } = render(<NewSale data={mockSale()} />);

    const wrapper = screen.queryByTestId("NewSale_wrapper");

    expect(container).toBeEmptyDOMElement();
    expect(wrapper).not.toBeInTheDocument();
  });
  it("should call setTimeout", () => {
    render(<NewSale data={mockSale()} />);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
  });
  it("should contain a title, a subtitle and a stock information if data exists", () => {
    mockedReplaceSubTitleValues.mockReturnValue("subtitle");
    mockedReplaceStockValues.mockReturnValue("4 pairs left in stock");
    render(<NewSale data={mockSale()} />);

    const title = screen.getByTestId("NewSale_title");
    const subTitle = screen.getByTestId("NewSale_subTitle");
    const stock = screen.getByTestId("NewSale_stock");

    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(stock).toBeInTheDocument();
  });
  it("should not contain a subtitle line if there is no data for it", () => {
    mockedReplaceSubTitleValues.mockReturnValue("");
    mockedReplaceStockValues.mockReturnValue("4 pairs left in stock");
    render(<NewSale data={mockSale()} />);

    const subTitle = screen.queryByTestId("NewSale_subTitle");
    expect(subTitle).not.toBeInTheDocument();
  });
  it("should not contain a stock line if there is no data for it", () => {
    mockedReplaceSubTitleValues.mockReturnValue("subtitle");
    mockedReplaceStockValues.mockReturnValue("");
    render(<NewSale data={mockSale()} />);

    const stock = screen.queryByTestId("NewSale_stock");
    expect(stock).not.toBeInTheDocument();
  });
});
