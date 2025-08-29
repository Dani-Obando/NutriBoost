import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetailsModal from "../ProductDetailsModal";
import { shopAPI } from "../../api/axios";

jest.mock("../../api/axios");

const baseProduct = {
  _id: "1",
  nombre: "Creatina",
  precio: 12000,
  imagen: "/img/creatina.png",
  descripcion: "Creatina monohidratada pura.",
  stock: 10,
  slug: "creatina",
};

describe("ProductDetailsModal", () => {
  const onClose = jest.fn();
  const onAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    shopAPI.get.mockImplementation(() => Promise.resolve({ data: baseProduct }));
    shopAPI.post = jest.fn(() => Promise.resolve({ data: { recommendations: [] } }));
  });

  it("renders loading state initially", () => {
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    expect(screen.getByText(/Cargando/)).toBeInTheDocument();
  });

  it("renders product details after loading", async () => {
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    expect(await screen.findByText("Creatina")).toBeInTheDocument();
    expect(screen.getByText(/₡12/)).toBeInTheDocument();
    expect(screen.getByText("Creatina monohidratada pura.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Agregar al carrito/ })).toBeInTheDocument();
  });

  it("calls onAddToCart with correct arguments", async () => {
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    const addButton = await screen.findByRole("button", { name: /Agregar al carrito/ });
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(onAddToCart).toHaveBeenCalledWith("1", 1);
    });
  });

  it("calls onClose when close button is clicked", async () => {
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    const closeButton = await screen.findByRole("button", { name: /×/ });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders error state if API fails", async () => {
    shopAPI.get.mockImplementationOnce(() => Promise.reject());
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    expect(await screen.findByText(/Error al cargar los detalles del producto/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cerrar/i })).toBeInTheDocument();
  });

  it("increments and decrements quantity, disables increment at stock", async () => {
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    await screen.findByText("Creatina");
    const plus = screen.getByRole("button", { name: "+" });
    const minus = screen.getByRole("button", { name: "-" });
    // increment
    fireEvent.click(plus);
    expect(screen.getByText("2")).toBeInTheDocument();
    // decrement
    fireEvent.click(minus);
    expect(screen.getByText("1")).toBeInTheDocument();
    // increment to stock
    for (let i = 1; i < baseProduct.stock; i++) fireEvent.click(plus);
    expect(plus).toBeDisabled();
  });

  it("shows recommendations if present", async () => {
    shopAPI.post.mockResolvedValueOnce({
      data: {
        recommendations: [
          { _id: "2", nombre: "Whey", imagen: "/img/whey.png", categoria: "Proteína", precio: 15000 },
          { _id: "3", nombre: "BCAA", imagen: "/img/bcaa.png", categoria: "Aminoácidos", precio: 8000 },
        ],
      },
    });
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    await screen.findByText("Creatina");
    expect(await screen.findByText("Whey")).toBeInTheDocument();
    expect(screen.getByText("BCAA")).toBeInTheDocument();
  });

  it("shows recommendations error if API fails", async () => {
    shopAPI.post.mockRejectedValueOnce(new Error("fail"));
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    await screen.findByText("Creatina");
    expect(await screen.findByText(/No se pudieron cargar recomendaciones/)).toBeInTheDocument();
  });

  it("shows empty recommendations message", async () => {
    shopAPI.post.mockResolvedValueOnce({ data: { recommendations: [] } });
    render(<ProductDetailsModal productId="1" onClose={onClose} onAddToCart={onAddToCart} />);
    await screen.findByText("Creatina");
    expect(await screen.findByText(/No encontramos recomendaciones/)).toBeInTheDocument();
  });
});
