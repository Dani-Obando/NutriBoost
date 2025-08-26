import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { securityAPI } from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

function Register({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await securityAPI.post("/auth/register", {
        username,
        email,
        password,
      });
      setUser(res.data.data.user);

      // Cierra el modal si el registro fue exitoso
      if (onClose) {
        onClose();
      }
      
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Crear cuenta
      </h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white font-semibold py-3 rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Regístrate
        </button>
      </form>
      <div className="flex flex-col items-center mt-6 text-sm space-y-2">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-cyan-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;