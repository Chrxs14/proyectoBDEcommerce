-- Eliminar tablas si existen
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Crear tabla users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla order_items
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Variables
DO $$
DECLARE
    total_products INT;
BEGIN
    SELECT COUNT(*) INTO total_products FROM products;
    RAISE NOTICE 'Total de productos: %', total_products;
END $$;

-- Restricciones (ya están incluidas en la creación de las tablas)

-- Operadores y Expresiones
SELECT * FROM products WHERE price > 50;

-- Secuencias
CREATE SEQUENCE custom_seq START 1;

-- Vistas
CREATE VIEW order_summary AS
SELECT o.order_id, u.username, o.total_amount
FROM orders o
JOIN users u ON o.user_id = u.user_id;

-- Índices
CREATE INDEX idx_product_name ON products(name);

-- Consultas CASE y PIVOT
SELECT product_id, name,
       CASE WHEN price > 100 THEN 'Caro' ELSE 'Barato' END AS price_category
FROM products;

-- Procedimientos Almacenados
CREATE OR REPLACE FUNCTION add_product(name VARCHAR, price DECIMAL) RETURNS VOID AS $$
BEGIN
    INSERT INTO products (name, price) VALUES (name, price);
END;
$$ LANGUAGE plpgsql;

-- Funciones
CREATE OR REPLACE FUNCTION get_total_orders() RETURNS INT AS $$
DECLARE
    total INT;
BEGIN
    SELECT COUNT(*) INTO total FROM orders;
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Disparadores (Triggers)
CREATE OR REPLACE FUNCTION update_stock() RETURNS TRIGGER AS $$
BEGIN
    UPDATE products SET stock = stock - NEW.quantity
    WHERE product_id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW EXECUTE FUNCTION update_stock();

-- Cursores
DO $$
DECLARE
    product_record RECORD;
    product_cursor CURSOR FOR SELECT * FROM products;
BEGIN
    OPEN product_cursor;
    LOOP
        FETCH product_cursor INTO product_record;
        EXIT WHEN NOT FOUND;
        RAISE NOTICE 'Product: %', product_record.name;
    END LOOP;
    CLOSE product_cursor;
END $$;