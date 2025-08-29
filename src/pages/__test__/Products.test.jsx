
import React from "react";
import { render, screen } from "@testing-library/react";
import Products from "../Products";

// Mock useOutletContext to provide a non-null value
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => ({ searchTerm: "" })
}));


import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

describe("Products", () => {
  const mockAuth = { user: { name: "Test User" } };
  const mockCart = { addToCart: jest.fn() };
  it("renders the Products page", () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <CartContext.Provider value={mockCart}>
          <Products />
        </CartContext.Provider>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/producto(s)?|catálogo/i)).toBeInTheDocument();
  });
});
