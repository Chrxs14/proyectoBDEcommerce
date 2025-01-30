const pool = require('../config/config');

class OrderItem {
    static async create(order_id, product_id, quantity, price) {
        const result = await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [order_id, product_id, quantity, price]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM order_items');
        return result.rows;
    }

    // Agrega más métodos según sea necesario.
}

module.exports = OrderItem;