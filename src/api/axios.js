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

// Función que aplica el interceptor a una instancia de Axios
const attachCSRF = (apiInstance, cookieName) => {
  apiInstance.interceptors.request.use((config) => {
    // Solo adjunta el token para métodos que modifican datos
    if (["post", "put", "delete"].includes(config.method)) {
      const csrfToken = getCookie(cookieName);
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  });
};

// Adjunta los interceptores a cada API con el nombre de cookie correcto
attachCSRF(securityAPI, "XSRF-TOKEN");
attachCSRF(shopAPI, "XSRF-TOKEN");

export { securityAPI, shopAPI };
