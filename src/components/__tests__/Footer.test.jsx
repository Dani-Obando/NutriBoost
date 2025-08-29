import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("NutriBoost")).toBeInTheDocument();
  });

  it("renders quick links", () => {
  render(<Footer />);
  expect(screen.getByText("Acerca de")).toBeInTheDocument();
  // Ensure at least one 'Contacto' link exists (not the heading)
  const contactoLinks = screen.getAllByText("Contacto");
  // At least one should be an anchor tag
  expect(contactoLinks.some(el => el.tagName === 'A')).toBe(true);
  expect(screen.getByText("Privacidad")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("soporte@nutriboost.com")).toBeInTheDocument();
    expect(screen.getByText("+123-456-7890")).toBeInTheDocument();
  });

  it("renders copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} NutriBoost`))).toBeInTheDocument();
  });
});
