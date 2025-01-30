// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Verifica si hay un token en localStorage

  return token ? children : <Navigate to="/login" />; // Si no hay token, redirige a login
};

export default PrivateRoute;
