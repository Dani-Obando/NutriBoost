// context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import { securityAPI, shopAPI } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await securityAPI.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  useEffect(() => {
    // Corregido: solo se necesita un token CSRF de la API de seguridad
    const initCSRF = async () => {
      try {
        await securityAPI.get("/auth/csrf-token");
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
    <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}   {" "}
    </AuthContext.Provider>
  );
};
