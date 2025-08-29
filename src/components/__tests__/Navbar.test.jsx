import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
  const renderWithContext = (contextValue, setSearchTerm = jest.fn()) =>
    render(
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar setSearchTerm={setSearchTerm} />
        </AuthContext.Provider>
      </BrowserRouter>
    );

  it("renders brand and search input", () => {
    renderWithContext({ user: null, logout: jest.fn() });
    expect(screen.getByText("NUTRIBOOST")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por nombre...")).toBeInTheDocument();
  });

  it("shows Sign In and Register when not logged in", () => {
    renderWithContext({ user: null, logout: jest.fn() });
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("shows Cart and menu when logged in", () => {
    renderWithContext({ user: { name: "Test" }, logout: jest.fn() });
    expect(screen.getByText("Carrito")).toBeInTheDocument();
  });

  it("calls setSearchTerm on input change", () => {
    const setSearchTerm = jest.fn();
    renderWithContext({ user: null, logout: jest.fn() }, setSearchTerm);
    fireEvent.change(screen.getByPlaceholderText("Buscar por nombre..."), { target: { value: "protein" } });
    expect(setSearchTerm).toHaveBeenCalledWith("protein");
  });
});
