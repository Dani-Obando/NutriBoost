import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { RouterProvider } from "react-router-dom"; // Add this import
import AppRoutes from "./routes.jsx"; // You might need this if you are not importing the router directly

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>{" "}
  </React.StrictMode>
);
