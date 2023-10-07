import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Game Sessions/i)[0];
  expect(linkElement).toBeInTheDocument();
});
