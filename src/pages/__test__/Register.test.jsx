import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Register from "../Register";

describe("Register", () => {
  const mockContext = {
    user: null,
    setUser: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    csrfToken: null,
  };

  it("renders the Register page", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <Register />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  
  expect(screen.getAllByText(/crear cuenta|regístrate/i).length).toBeGreaterThan(0);
  });
});
