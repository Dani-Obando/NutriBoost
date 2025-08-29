import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact", () => {
  it("renders the Contact page", () => {
    render(<Contact />);
    expect(screen.getByText(/contacto/i)).toBeInTheDocument();
  });
});
