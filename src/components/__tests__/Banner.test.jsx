import React from "react";
import { render, screen } from "@testing-library/react";
import Banner from "../Banner";

describe("Banner", () => {
  it("renders the banner image", () => {
    render(<Banner />);
    const img = screen.getByAltText("C4 Original");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/c4-banner.png");
  });

  it("renders all benefit list items", () => {
    render(<Banner />);
    expect(screen.getByText("Aumento de energía")).toBeInTheDocument();
    expect(screen.getByText("Mejora del rendimiento físico")).toBeInTheDocument();
    expect(screen.getByText("Bombeo Muscular")).toBeInTheDocument();
    expect(screen.getByText("Ayuda a la recuperación muscular")).toBeInTheDocument();
  });

  it("renders the floating text 'sa'", () => {
    render(<Banner />);
    expect(screen.getByText("sa")).toBeInTheDocument();
  });
});
