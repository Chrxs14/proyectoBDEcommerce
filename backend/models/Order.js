const pool = require('../config/config');

class Order {
    static async create(user_id, total_amount) {
        const result = await pool.query(
            'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
            [user_id, total_amount]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM orders');
        return result.rows;
    }

    // Agrega más métodos según sea necesario.
}

module.exports = Order;