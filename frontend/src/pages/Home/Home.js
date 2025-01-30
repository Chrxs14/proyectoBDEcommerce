import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, logout } from "../../services/api"; // Servicio para obtener productos
import "./Home.css"; // Archivo de estilos

const Home = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001"; // O la URL del backend

  const getImageUrl = (product) => {
    return product.image_url
      ? `${BASE_URL}${product.image_url}`
      : "/images/default.png";
  };

  // Obtener los productos al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    logout(); // Limpiar datos del usuario
    navigate("/login"); // Redirigir al login
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1>Mi Ecommerce</h1>
        <nav>
          <button onClick={() => navigate("/")}>Inicio</button>
          <button onClick={() => navigate("/products")}>Productos</button>
          <button onClick={() => navigate("/create-product")}>
            Crear Producto
          </button>{" "}
          {/* ✅ Nuevo botón */}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </header>

      {/* Lista de Productos */}
      <main className="product-list">
        <h2>Productos Destacados</h2>

        {/* ✅ Botón para ir a la página de creación de productos */}
        <button
          className="create-product-btn"
          onClick={() => navigate("/create-product")}
        >
          + Agregar Producto
        </button>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.product_id} className="product-card">
              <img src={getImageUrl(product)} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
