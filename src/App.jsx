import { useEffect } from "react";
import { securityAPI, shopAPI } from "./api/axios";
import AppRoutes from "./routes.jsx";

function App() {
  useEffect(() => {
    const initCSRF = async () => {
      try {
        await securityAPI.get("/");
        await shopAPI.get("/products");
        console.log("CSRF tokens inicializados correctamente");
      } catch (err) {
        console.error("Error inicializando CSRF", err);
      }
    };
    initCSRF();
  }, []);

  return <AppRoutes />;
}

export default App;
