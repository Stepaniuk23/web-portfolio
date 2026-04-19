import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders contact section on home page", () => {
  render(<App />);
  const contactHeading = screen.getByText(/contact me/i);
  expect(contactHeading).toBeInTheDocument();
});
