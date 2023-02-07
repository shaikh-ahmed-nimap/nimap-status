DROP DATABASE IF EXISTS products_crud;
CREATE DATABASE products_crud;

USE products_crud;
CREATE TABLE products (
	product_id TINYINT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(5, 2) NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE
);

INSERT INTO products (product_name, price) VALUES 
('product 1', 40.00),
('product 2', 50.00),
('product 3', 50.00),
('product 4', 50.00),
('product 5', 50.00)
;