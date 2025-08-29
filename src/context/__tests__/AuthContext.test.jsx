import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AuthProvider, AuthContext } from "../AuthContext";
import { securityAPI, setupCsrfInterceptor } from "../../api/axios";

// 🛠 Mock de axios y setupCsrfInterceptor
jest.mock("../../api/axios", () => ({
  securityAPI: {
    get: jest.fn(),
    post: jest.fn()
  },
  setupCsrfInterceptor: jest.fn()
}));

describe("AuthProvider - casos completos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("inicializa CSRF y obtiene perfil del usuario", async () => {
    securityAPI.get.mockImplementation((url) => {
      if (url === "/auth/csrf-token") {
        return Promise.resolve({ data: { "XSRF-TOKEN": "fake-csrf" } });
      }
      if (url === "/users/profile") {
        return Promise.resolve({ data: { data: { user: { id: 1, name: "Adrián" } } } });
      }
      return Promise.reject(new Error("Unknown endpoint"));
    });

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, csrfToken }) =>
            csrfToken == null || user == null ? (
              <div data-testid="loading">Cargando...</div>
            ) : (
              <div>
                <span data-testid="csrf">{csrfToken}</span>
                <span data-testid="user">{user.name}</span>
              </div>
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    );

    // ✅ Esperamos a que aparezca csrf y user
    const csrf = await screen.findByTestId("csrf");
    const user = await screen.findByTestId("user");

    expect(csrf).toHaveTextContent("fake-csrf");
    expect(user).toHaveTextContent("Adrián");
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    expect(securityAPI.get).toHaveBeenCalledWith("/auth/csrf-token");
    expect(securityAPI.get).toHaveBeenCalledWith("/users/profile");
    expect(setupCsrfInterceptor).toHaveBeenCalled();
  });

  test("login funciona correctamente", async () => {
    // Mock de inicialización
    securityAPI.get
      .mockResolvedValueOnce({ data: { "XSRF-TOKEN": "fake-csrf" } }) // /auth/csrf-token
      .mockResolvedValueOnce({ data: { data: { user: null } } }); // /users/profile inicial vacío

    // Mock de login
    securityAPI.post.mockResolvedValueOnce({ data: { data: { user: { id: 1, name: "Adrián" } } } });

    let contextValue;
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return <div>{value?.user ? value.user.name : "sin usuario"}</div>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    // ✅ Espera a que el AuthProvider ya tenga csrf
    await waitFor(() => {
      expect(contextValue).toBeDefined();
      expect(contextValue.csrfToken).toBe("fake-csrf");
    });

    // ✅ Ejecuta login
    await act(async () => {
      await contextValue.login("test@test.com", "123456");
    });

    // ✅ Verifica que se muestre el usuario
    expect(await screen.findByText("Adrián")).toBeInTheDocument();

    expect(securityAPI.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@test.com",
      password: "123456"
    });
  });

  test("login maneja error correctamente", async () => {
    // Mock de inicialización
    securityAPI.get
      .mockResolvedValueOnce({ data: { "XSRF-TOKEN": "fake-csrf" } }) // /auth/csrf-token
      .mockResolvedValueOnce({ data: { data: { user: null } } }); // /users/profile inicial vacío

    // Mock de error en login
    securityAPI.post.mockRejectedValueOnce(new Error("Credenciales inválidas"));

    let contextValue;
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return <div>{value?.user ? value.user.name : "sin usuario"}</div>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    // ✅ Espera inicialización
    await waitFor(() => {
      expect(contextValue).toBeDefined();
      expect(contextValue.csrfToken).toBe("fake-csrf");
    });

    // ✅ Ejecuta login que falla
    await expect(
      contextValue.login("fail@test.com", "wrong")
    ).rejects.toThrow("Credenciales inválidas");

    // ✅ Verifica que siga sin usuario
    expect(await screen.findByText("sin usuario")).toBeInTheDocument();
  });
});
