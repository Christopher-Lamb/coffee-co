import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders something", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText("Something")).toBeInTheDocument();
  });
});
