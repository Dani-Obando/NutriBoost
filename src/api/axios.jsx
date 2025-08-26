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

// Función que aplica el interceptor a una instancia de Axios
const attachCSRF = (apiInstance, getCsrfToken) => {
  apiInstance.interceptors.request.use((config) => {
    if (["post", "put", "delete"].includes(config.method)) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  });
};

// Configura el interceptor con una función para obtener el token CSRF
export const setupCsrfInterceptor = (getCsrfToken) => {
  attachCSRF(securityAPI, getCsrfToken);
  attachCSRF(shopAPI, getCsrfToken);
};

export { securityAPI, shopAPI };
