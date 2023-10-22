import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Game Sessions text (in navigation bar)", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Game Sessions/i)[0];
  expect(linkElement).toBeInTheDocument();
});
