

import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import ProductDetail from "../ProductDetail";

describe("ProductDetail", () => {
  it("renders the ProductDetail page", () => {
    const mockAuth = { user: { name: "Test User" } };
    const mockCart = { addToCart: jest.fn() };
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuth}>
          <CartContext.Provider value={mockCart}>
            <ProductDetail />
          </CartContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/detalle(s)?|producto/i)).toBeInTheDocument();
  });
});
