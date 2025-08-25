import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { securityAPI } from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await securityAPI.post("/auth/login", { email, password });
      setUser(res.data.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error en el login");
    }
  };

  return (
    <div className="py-12">
      <div className="container max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
