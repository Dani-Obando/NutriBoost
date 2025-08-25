import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-primary text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          NutriBoost
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-200 transition">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 transition">
              Acerca de
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200 transition">
              Contacto
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-gray-200 transition">
                  Perfil
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gray-200 transition">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-gray-200 transition">
                  Órdenes
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="hover:text-gray-200 transition"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-200 transition">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
