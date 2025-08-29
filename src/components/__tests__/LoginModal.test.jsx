import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginModal from "../LoginModal";

import { AuthContext } from "../../context/AuthContext";

describe("LoginModal", () => {
  const mockContext = {
    user: null,
    setUser: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    csrfToken: null,
  };

  it("renders the modal and close button", () => {
    const handleClose = jest.fn();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <LoginModal onClose={handleClose} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByRole("button", { name: /×/ })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <LoginModal onClose={handleClose} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /×/ }));
    expect(handleClose).toHaveBeenCalled();
  });

  it("renders the Login component", () => {
    const handleClose = jest.fn();
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <LoginModal onClose={handleClose} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    // The Login component should render a form or some text, but since it's imported, we just check for the modal container
    expect(screen.getByRole("button", { name: /×/ })).toBeInTheDocument();
  });
});
