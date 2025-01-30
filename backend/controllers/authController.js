const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Hashear la contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Crear el usuario
        const user = await User.create(username, email, passwordHash);

        // Respuesta exitosa
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    try {
        // Buscar el usuario por email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isPasswordValid = await User.comparePassword(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.JWT_SECRET, // Clave secreta para firmar el token
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // Respuesta exitosa
        res.status(200).json({
            success: true,
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};