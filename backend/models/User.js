const pool = require('../config/config');
const bcrypt = require('bcrypt');

class User {
    static async create(username, email, password_hash) {
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password_hash]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    static async comparePassword(password, passwordHash) {
        return await bcrypt.compare(password, passwordHash);
    }
}

module.exports = User;