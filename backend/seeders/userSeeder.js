const pool = require('../config/config');

const seedUsers = async () => {
    const users = [
        { username: 'user1', email: 'user1@example.com', password_hash: 'hash1' },
        { username: 'user2', email: 'user2@example.com', password_hash: 'hash2' },
    ];

    for (const user of users) {
        await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
            [user.username, user.email, user.password_hash]
        );
    }
};

seedUsers()
    .then(() => {
        console.log('Users seeded');
        return pool.end(); // Cerrando la conexión.
    })
    .catch(err => {
        console.error('Error seeding users:', err);
        pool.end(); // Asegúrate de cerrar la conexión en caso de error.
    });