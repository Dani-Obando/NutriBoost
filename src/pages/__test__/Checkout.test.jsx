import React from "react";
import { render, screen } from "@testing-library/react";
import Checkout from "../Checkout";
import { CartProvider } from "../../context/CartContext";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("Checkout", () => {
  it("renders the Checkout page", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Checkout />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  // There are multiple elements with 'checkout', 'pago', or 'finalizar', so check that at least one exists
  expect(screen.getAllByText(/checkout|pago|finalizar/i).length).toBeGreaterThan(0);
  });
});
