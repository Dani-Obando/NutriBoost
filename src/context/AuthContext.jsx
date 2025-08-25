import { createContext, useEffect, useState } from "react";
import { securityAPI } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [csrfLoaded, setCsrfLoaded] = useState(false);

  // Define la función logout aquí
  const logout = async () => {
    try {
      await securityAPI.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  const login = async (email, password) => {
    try {
      // Intenta obtener el token antes de cada login si aún no está cargado
      if (!csrfLoaded) {
        console.warn("CSRF token not loaded. Fetching now.");
        await securityAPI.get("/auth/csrf-token");
        setCsrfLoaded(true);
      }
      const res = await securityAPI.post("/auth/login", { email, password });
      setUser(res.data.data.user);
      return res;
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      throw err;
    }
  };

  useEffect(() => {
    const initCSRF = async () => {
      try {
        await securityAPI.get("/auth/csrf-token");
        setCsrfLoaded(true);
        console.log("CSRF token inicializado correctamente");
      } catch (err) {
        console.error("Error inicializando CSRF", err);
      }
    };
    initCSRF();

    const fetchUser = async () => {
      try {
        const res = await securityAPI.get("/users/profile");
        setUser(res.data.data.user);
      } catch (err) {
        console.error("Error al obtener perfil", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
