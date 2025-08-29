import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About", () => {
  it("renders the heading", () => {
    render(<About />);
    expect(screen.getByText("Acerca de NutriBoost")).toBeInTheDocument();
  });

  it("renders the first paragraph", () => {
    render(<About />);
    expect(
      screen.getByText(/NutriBoost es tu tienda en línea especializada/i)
    ).toBeInTheDocument();
  });

  it("renders the second paragraph", () => {
    render(<About />);
    expect(
      screen.getByText(/Fundada en 2023, nuestra misión es ofrecer/i)
    ).toBeInTheDocument();
  });
});
