import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/api';
import './CreateProduct.css';

const getRandomImage = () => {
  return `https://source.unsplash.com/400x400/?product`; // Imagen aleatoria de Unsplash
};

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(getRandomImage()); // ✅ Imagen aleatoria por defecto
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const productData = {
      name,
      description,
      price,
      stock: 10, // Puedes ajustar este valor
      image_url: imageUrl, // ✅ Guardamos la URL de la imagen
    };

    try {
      await createProduct(productData);
      navigate('/'); // Redirigir al home después de publicar el producto
    } catch (error) {
      console.error("Error en la creación del producto:", error);
      setError(error.error || 'Error al publicar el producto');
    }
  };

  return (
    <div className="create-product-container">
      <h2>Publicar un Producto</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL de la Imagen:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="button" onClick={() => setImageUrl(getRandomImage())}>
            Generar Imagen Aleatoria
          </button>
        </div>
        <button type="submit">Publicar Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
