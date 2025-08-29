import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Login from "../Login";

describe("Login", () => {
  const mockContext = {
    user: null,
    setUser: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    csrfToken: null,
  };

  it("renders the Login page", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
});
