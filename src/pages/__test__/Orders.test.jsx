import React from "react";
import { render, screen } from "@testing-library/react";
import Orders from "../Orders";

jest.mock("../../api/axios", () => ({
  shopAPI: {
    get: jest.fn(() => Promise.resolve({ data: [] }))
  }
}));

describe("Orders", () => {
  it("renders the Orders page", async () => {
    render(<Orders />);
    // Wait for loading to finish and heading to appear
    expect(await screen.findByText("Mis Pedidos")).toBeInTheDocument();
  });
});
