import { Link, useNavigate } from "react-router-dom"; 
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar({ setSearchTerm }) {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/"); 
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
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-300 hover:text-white focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
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