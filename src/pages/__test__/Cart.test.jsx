import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { CartProvider } from "../../context/CartContext";
import { BrowserRouter } from "react-router-dom";

describe("Cart", () => {
  it("renders the Cart page", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Cart />
        </CartProvider>
      </BrowserRouter>
    );
  // There are multiple elements with 'carrito', so check that at least one exists
  expect(screen.getAllByText(/carrito/i).length).toBeGreaterThan(0);
  });
});
