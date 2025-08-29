import React from "react";
import { render, screen } from "@testing-library/react";
import CreateProduct from "../Admin/CreateProduct";

describe("CreateProduct", () => {
  it("renders the CreateProduct page", () => {
    render(<CreateProduct />);
  // There are multiple elements with 'crear producto' or 'nuevo producto', so check that at least one exists
  expect(screen.getAllByText(/crear producto|nuevo producto/i).length).toBeGreaterThan(0);
  });
});
