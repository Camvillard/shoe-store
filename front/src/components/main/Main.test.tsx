import { render, screen } from "@testing-library/react";
import Main from "./Main.component";

it("should render a header and a footer", () => {
  render(<Main />);
  const header = screen.getByRole("banner");
  const footer = screen.getByTestId("Main_footer");
  expect(header).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
