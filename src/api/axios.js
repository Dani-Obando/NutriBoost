// api/axios.js

import axios from "axios";

// Instancias de Axios
const securityAPI = axios.create({
  baseURL: "http://localhost:5002",
  withCredentials: true,
});

const shopAPI = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Función auxiliar para obtener cookies por nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Interceptor para la API de seguridad
securityAPI.interceptors.request.use((config) => {
  // Solo adjunta el token para métodos que no sean GET
  if (["post", "put", "delete"].includes(config.method)) {
    const csrfToken = getCookie("XSRF-TOKEN-SECURITY");
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
  }
  return config;
});

// Interceptor para la API de la tienda
shopAPI.interceptors.request.use((config) => {
  // Solo adjunta el token para métodos que no sean GET
  if (["post", "put", "delete"].includes(config.method)) {
    const csrfToken = getCookie("XSRF-TOKEN-SHOP");
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
  }
  return config;
});

export { securityAPI, shopAPI };
