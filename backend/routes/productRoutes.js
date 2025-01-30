const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();

// 📂 Configurar almacenamiento de imágenes en `uploads/`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads'); // Ruta absoluta a `uploads/`
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')); // Renombrar archivo
  }
});

const upload = multer({ storage });

// 📌 Ruta para crear un producto con imagen
router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
