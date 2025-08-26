import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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

    // Validaciones en el frontend
    if (!email.trim()) {
      setError("El correo es obligatorio");
      return;
    }
    if (!password.trim()) {
      setError("La contraseña es obligatoria");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("El correo no es válido");
      return;
    }

    try {
      const res = await securityAPI.post("/auth/login", { email, password });
      setUser(res.data.data.user);
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage === "El correo y la contraseña son obligatorios") {
        setError("El correo y la contraseña son obligatorios");
      } else if (errorMessage === "El correo no es válido") {
        setError("El correo no es válido");
      } else if (errorMessage === "El correo no está registrado") {
        setError("El correo no está registrado");
      } else if (errorMessage === "La contraseña es incorrecta") {
        setError("Correo o contraseña incorrectos");
      } else if (err.response?.status === 403) {
        setError("Error de validación CSRF. Por favor, intenta de nuevo");
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo más tarde");
      }
    }
  };

  return (
    <div className="bg-white flex flex-col items-center pt-12">
      <div className="container mx-auto max-w-sm">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Iniciar Sesión
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
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
              ENTRAR
            </button>
          </form>
          <div className="flex flex-col items-center mt-6 text-sm space-y-2">
            <a href="#" className="text-cyan-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <p className="text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-cyan-600 hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;