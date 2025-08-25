import axios from "axios";

const securityAPI = axios.create({
  baseURL: "http://localhost:5002",
  withCredentials: true,
});

const shopAPI = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const attachCSRF = (apiInstance) => {
  apiInstance.interceptors.request.use(async (config) => {
    if (["post", "put", "delete"].includes(config.method)) {
      const csrfToken = getCookie("XSRF-TOKEN");
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  });
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

attachCSRF(securityAPI);
attachCSRF(shopAPI);

export { securityAPI, shopAPI };
