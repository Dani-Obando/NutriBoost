// src/routes.jsx
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

// Componentes
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// El Layout define la estructura visual y maneja el estado de la búsqueda
const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="min-h-screen bg-gray-100">
        <Outlet context={{ searchTerm }} />
      </main>
      <Footer />
    </>
  );
};

// Definición de todas las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/products" replace /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/cart", element: <Cart /> },
      { path: "/orders", element: <Orders /> },
      { path: "/admin/products/create", element: <CreateProduct /> },
    ],
  },
]);

// Componente que provee las rutas a la aplicación
function RoutesProvider() {
  return <RouterProvider router={router} />;
}

export default RoutesProvider;