const pool = require('../config/config');

class Product {
    static async create(name, description, price, stock, image_url) {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, stock, image_url]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }
}

module.exports = Product;
