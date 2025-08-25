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
    const initCSRF = async () => {
      try {
        await securityAPI.get("/");
        await shopAPI.get("/products");
        console.log("CSRF listo");
      } catch (err) {
        console.error("Error inicializando CSRF", err);
      }
    };
    initCSRF();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
