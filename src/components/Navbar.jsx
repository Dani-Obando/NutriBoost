// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar({ setSearchTerm }) {
  const { user, logout } = useContext(AuthContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center space-x-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          NUTRIBOOST
        </Link>
        <div className="flex-grow flex justify-center">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full max-w-md px-4 py-2 border border-gray-600 rounded-full bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <Link to="/cart" className="text-gray-300 hover:text-white transition">Carrito</Link>
              <button onClick={logout} className="text-gray-300 hover:text-white transition">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">Sign In</Link>
              <Link to="/register" className="bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-700 transition">
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