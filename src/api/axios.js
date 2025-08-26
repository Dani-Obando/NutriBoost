import axios from "axios";

// URL base de tu API (para las imágenes y peticiones)
export const BASE_URL = "http://localhost:5000"; // Cambia el puerto si tu API corre en otro

// Instancia de Axios para la tienda
const shopAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Muy importante si envías cookies
});

// Instancia de Axios para seguridad/auth
export const securityAPI = axios.create({
  baseURL: "http://localhost:5002", // Tu API de seguridad
  withCredentials: true,
});

// Función auxiliar para obtener cookies por nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Función que aplica el interceptor a una instancia de Axios
const attachCSRF = (apiInstance, cookieName) => {
  apiInstance.interceptors.request.use((config) => {
    if (["post", "put", "delete"].includes(config.method)) {
      const csrfToken = getCookie(cookieName);
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  });
};

// Adjunta interceptores CSRF
attachCSRF(securityAPI, "XSRF-TOKEN");
attachCSRF(shopAPI, "XSRF-TOKEN");

export { shopAPI };
