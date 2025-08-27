import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    // Para depurar en el futuro, puedes descomentar la siguiente línea:
    // console.log("Añadiendo al carrito:", product);
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
        // En lugar de no hacer nada, podríamos eliminar el producto
        // removeFromCart(id);
        return; 
    }
    setCart((prev) => 
        prev.map((item) => 
            item._id === id ? { ...item, quantity: newQuantity } : item
        )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};