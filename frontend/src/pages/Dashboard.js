// src/pages/HomePage.js
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Bienvenido</h2>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
