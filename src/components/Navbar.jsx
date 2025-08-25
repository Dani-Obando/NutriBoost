// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center space-x-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-800">
          NUTRIBOOST
        </Link>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-2 items-center">
          {user ? (
            // ... (Tu código para usuario autenticado)
            <>
              <Link to="/cart" className="text-gray-600 hover:text-gray-900 transition">Carrito</Link>
              <button onClick={logout} className="text-gray-600 hover:text-gray-900 transition">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition">
                Sign In
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;