import React from "react";
import { render, act } from "@testing-library/react";
import { CartProvider, CartContext } from "../CartContext";

const mockProduct = { _id: "1", name: "Apple", price: 2 };
const mockProduct2 = { _id: "2", name: "Banana", price: 1 };

describe("CartContext", () => {
  it("adds a product to the cart", () => {
    let contextValue;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    act(() => {
      contextValue.addToCart(mockProduct, 2);
    });
    expect(contextValue.cart).toEqual([
      { ...mockProduct, quantity: 2 }
    ]);
  });

  it("increments quantity if product already in cart", () => {
    let contextValue;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    act(() => {
      contextValue.addToCart(mockProduct, 1);
      contextValue.addToCart(mockProduct, 3);
    });
    expect(contextValue.cart).toEqual([
      { ...mockProduct, quantity: 4 }
    ]);
  });

  it("removes a product from the cart", () => {
    let contextValue;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    act(() => {
      contextValue.addToCart(mockProduct, 1);
      contextValue.addToCart(mockProduct2, 1);
      contextValue.removeFromCart("1");
    });
    expect(contextValue.cart).toEqual([
      { ...mockProduct2, quantity: 1 }
    ]);
  });

  it("updates quantity of a product in the cart", () => {
    let contextValue;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    act(() => {
      contextValue.addToCart(mockProduct, 1);
      contextValue.updateQuantity("1", 5);
    });
    expect(contextValue.cart).toEqual([
      { ...mockProduct, quantity: 5 }
    ]);
  });

  it("does not update quantity if newQuantity < 1", () => {
    let contextValue;
    render(
      <CartProvider>
        <CartContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartProvider>
    );
    act(() => {
      contextValue.addToCart(mockProduct, 1);
      contextValue.updateQuantity("1", 0);
    });
    expect(contextValue.cart).toEqual([
      { ...mockProduct, quantity: 1 }
    ]);
  });
});
