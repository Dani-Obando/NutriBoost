import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../context/AuthContext";
import Profile from "../Profile";

describe("Profile", () => {
  const mockAuth = { user: { name: "Test User" } };
  it("renders the Profile page", () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <Profile />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/perfil|usuario/i)).toBeInTheDocument();
  });
});
