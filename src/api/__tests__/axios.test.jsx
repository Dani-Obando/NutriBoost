import axios from "axios";
import { securityAPI, shopAPI, setupCsrfInterceptor } from "../axios";

describe("axios API instances", () => {
  it("securityAPI has correct baseURL and credentials", () => {
    expect(securityAPI.defaults.baseURL).toBe("http://localhost:5002");
    expect(securityAPI.defaults.withCredentials).toBe(true);
  });

  it("shopAPI has correct baseURL and credentials", () => {
    expect(shopAPI.defaults.baseURL).toBe("http://localhost:5000");
    expect(shopAPI.defaults.withCredentials).toBe(true);
  });
});

describe("setupCsrfInterceptor", () => {
  it("attaches CSRF token to post/put/delete requests", async () => {
    const mockGetCsrfToken = jest.fn(() => "test-csrf-token");
    setupCsrfInterceptor(mockGetCsrfToken);

    // Mock request config
    const config = { method: "post", headers: {} };
    const intercepted = await securityAPI.interceptors.request.handlers[0].fulfilled(config);
    expect(intercepted.headers["X-XSRF-TOKEN"]).toBe("test-csrf-token");
  });

  it("does not attach CSRF token to get requests", async () => {
    const mockGetCsrfToken = jest.fn(() => "test-csrf-token");
    setupCsrfInterceptor(mockGetCsrfToken);

    const config = { method: "get", headers: {} };
    const intercepted = await securityAPI.interceptors.request.handlers[0].fulfilled(config);
    expect(intercepted.headers["X-XSRF-TOKEN"]).toBeUndefined();
  });
});
