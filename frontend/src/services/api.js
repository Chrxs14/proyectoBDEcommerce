import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"; 

// ✅ Interceptor para incluir el token en todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token de localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregarlo al header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    // ✅ Guardar token y usuario en localStorage después del login
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error de autenticación" };
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error en el registro" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData); // Asegúrate de que esta ruta exista en tu backend
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
