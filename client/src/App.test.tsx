import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Login text (in navigation bar)", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Login/i)[0];
  expect(linkElement).toBeInTheDocument();
});
