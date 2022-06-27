import { render, screen } from "@testing-library/react";
import SalesModuleContainer, {
  SalesModuleProps,
} from "../SalesModule.container";

const mockCheckProps = jest.fn();

jest.mock("../SalesModule.component", () => (props: SalesModuleProps) => {
  mockCheckProps(props);
  const { children } = props;
  const mockedSalesModule = <div>mocked sales module {children}</div>;
  return mockedSalesModule;
});

describe("SalesModule container", () => {
  it("should contain a sales module component with children if a children prop is passed", () => {
    render(
      <SalesModuleContainer
        moduleTitle="this is the title"
        children={<p>hey I am the child component</p>}
        switchViewsBtnLabel="switch me"
        switchViews={jest.fn()}
      />
    );

    const salesModule = screen.getByText("mocked sales module");
    const child = screen.getByText("hey I am the child component");
    expect(salesModule).toBeInTheDocument();
    expect(child).toBeInTheDocument();
  });
  it("should be empty if there is no children prop passed to the component", () => {
    const { container } = render(
      <SalesModuleContainer
        moduleTitle="this is the title"
        children={null}
        switchViewsBtnLabel="switch me"
        switchViews={jest.fn()}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
  it("should call SalesModule component with correct props", () => {
    const switchViews = jest.fn();
    render(
      <SalesModuleContainer
        moduleTitle="this is the title"
        children={<p>hey I am the child component</p>}
        switchViewsBtnLabel="switch me"
        switchViews={switchViews}
      />
    );

    expect(mockCheckProps).toHaveBeenCalledTimes(1);
    expect(mockCheckProps).toHaveBeenCalledWith(
      expect.objectContaining({
        isExpanded: false,
        switchViews,
        moduleTitle: "this is the title",
        children: <p>hey I am the child component</p>,
        switchViewsBtnLabel: "switch me",
      })
    );
  });
});
