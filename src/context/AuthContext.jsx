import { createContext, useState } from "react";
import { securityAPI } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [csrfLoaded, setCsrfLoaded] = useState(false);

  // Inicializa CSRF token antes de cualquier login
  const initCSRF = async () => {
    if (!csrfLoaded) {
      try {
        await securityAPI.get("/auth/csrf-token");
        setCsrfLoaded(true);
        console.log("CSRF token inicializado correctamente");
      } catch (err) {
        console.error("Error inicializando CSRF", err);
      }
    }
  };

  // Login
  const login = async (email, password) => {
  try {
    // 1️⃣ pedir CSRF
    const csrfRes = await securityAPI.get("/auth/csrf-token");
    const csrfToken = csrfRes.data.csrfToken; // <-- esto depende de tu API

    // 2️⃣ enviar login con token en headers
    const res = await securityAPI.post(
      "/auth/login",
      { email, password },
      { headers: { "X-XSRF-TOKEN": csrfToken } }
    );

    setUser(res.data.data.user);
    return res.data.data.user;
  } catch (err) {
    console.error("Error al iniciar sesión", err);
    throw err;
  }
};


  // Logout
const logout = async () => {
  try {
    // 1️⃣ pedir CSRF
    const csrfRes = await securityAPI.get("/auth/csrf-token");
    const csrfToken = csrfRes.data.csrfToken; // depende de tu API

    // 2️⃣ enviar logout con token
    await securityAPI.post(
      "/auth/logout",
      {},
      { headers: { "X-XSRF-TOKEN": csrfToken } }
    );

    setUser(null);
    console.log("Logout exitoso");
  } catch (err) {
    console.error("Error al cerrar sesión", err);
  }
};


  // fetchUser solo después de login
  const fetchUser = async () => {
    if (!user) return null;
    try {
      const res = await securityAPI.get("/users/profile");
      setUser(res.data.data.user);
      return res.data.data.user;
    } catch (err) {
      console.error("Error al obtener perfil", err);
      setUser(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
