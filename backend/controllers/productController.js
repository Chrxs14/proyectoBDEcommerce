const pool = require('../config/config'); // ✅ Importa la conexión a la BD
const path = require('path');
const fs = require('fs');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Ruta de la imagen

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, stock, imagePath]
        );

        res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) {
        console.error("Error al guardar producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};
