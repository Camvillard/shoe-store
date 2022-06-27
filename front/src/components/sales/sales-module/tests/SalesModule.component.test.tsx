import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SalesModule from "../SalesModule.component";

describe("SalesModule component", () => {
  beforeEach(() => jest.resetAllMocks());
  it("should render the component with a button only if isExpanded is false", () => {
    render(
      <SalesModule
        moduleTitle="I am still the title"
        switchViewsBtnLabel="the label"
        switchViews={jest.fn()}
        toggleDetails={jest.fn()}
        isExpanded={false}
      >
        I am still the child component
      </SalesModule>
    );
    const button = screen.getByRole("button");
    const children = screen.queryByTestId("SalesModule_details");
    const actions = screen.queryByTestId("SalesModule_actions-wrapper");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("I am still the title");
    expect(children).not.toBeInTheDocument();
    expect(actions).not.toBeInTheDocument();
  });

  it("should render the component with a button and details isExpanded is true", () => {
    render(
      <SalesModule
        moduleTitle="I am still the title"
        switchViewsBtnLabel="the label"
        switchViews={jest.fn()}
        toggleDetails={jest.fn()}
        isExpanded
      >
        I am still the child component
      </SalesModule>
    );
    const button = screen.getAllByRole("button");
    const children = screen.getByTestId("SalesModule_details");
    const actions = screen.getByTestId("SalesModule_actions-wrapper");
    expect(button).toHaveLength(5);
    expect(button[0]).toHaveTextContent("I am still the title");
    expect(button[1]).toHaveTextContent("the label");
    expect(children).toBeInTheDocument();
    expect(children).toHaveTextContent("I am still the child component");
    expect(actions).toBeInTheDocument();
  });
  it("should call toggleDetails when clicking on the title button", async () => {
    const user = userEvent.setup();
    const toggleDetails = jest.fn();
    render(
      <SalesModule
        moduleTitle="I am still the title"
        switchViewsBtnLabel="the label"
        switchViews={jest.fn()}
        toggleDetails={toggleDetails}
        isExpanded={false}
      >
        I am still the child component
      </SalesModule>
    );
    const button = screen.getByRole("button");
    await user.click(button);
    expect(toggleDetails).toHaveBeenCalledTimes(1);
  });
  it("should call switchViews when clicking on the switch views button", async () => {
    const user = userEvent.setup();
    const switchViews = jest.fn();
    render(
      <SalesModule
        moduleTitle="I am still the title"
        switchViewsBtnLabel="the label"
        switchViews={switchViews}
        toggleDetails={jest.fn()}
        isExpanded
      >
        I am still the child component
      </SalesModule>
    );
    const button = screen.getByText("the label");
    await user.click(button);
    expect(switchViews).toHaveBeenCalledTimes(1);
  });
});
