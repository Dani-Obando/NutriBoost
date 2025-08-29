import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
  it("renders product name, price, and image", () => {
    render(
      <ProductCard name="Whey Protein" price={15000} imageUrl="/img/protein.png" />
    );
    expect(screen.getByText("Whey Protein")).toBeInTheDocument();
    expect(screen.getByText(/₡15000/)).toBeInTheDocument();
    const img = screen.getByAltText("Whey Protein");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/img/protein.png");
  });
});
