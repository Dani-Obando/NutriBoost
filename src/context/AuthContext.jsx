import { createContext, useEffect, useState } from "react";
import { securityAPI, setupCsrfInterceptor } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const [csrfLoading, setCsrfLoading] = useState(false);

  // Inicializar el token CSRF
  const initCSRF = async () => {
    if (csrfLoading || csrfToken) {
      return;
    }
    setCsrfLoading(true);
    try {
      const response = await securityAPI.get("/auth/csrf-token");
      setCsrfToken(response.data["XSRF-TOKEN"]);
    } catch (err) {
      setCsrfToken(null);
    } finally {
      setCsrfLoading(false);
    }
  };

  // Configurar el interceptor de CSRF
  useEffect(() => {
    setupCsrfInterceptor(() => csrfToken);
  }, [csrfToken]);

  // Login
  const login = async (email, password) => {
    try {
      if (!csrfToken) {
        await initCSRF();
      }
      const res = await securityAPI.post("/auth/login", { email, password });
      setUser(res.data.data.user);
      return res;
    } catch (err) {
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (!csrfToken) {
        await initCSRF();
      }
      await securityAPI.post("/auth/logout");
      setUser(null);
      setCsrfToken(null);
    } catch (err) {
      throw err;
    }
  };

  // Inicializar CSRF y obtener perfil al montar el componente
  useEffect(() => {
    const initialize = async () => {
      try {
        await initCSRF();
        const res = await securityAPI.get("/users/profile");
        setUser(res.data.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, csrfToken }}>
      {children}
    </AuthContext.Provider>
  );
};
