CREATE DATABASE IF NOT EXISTS sql_store2;
USE sql_store2;
CREATE TABLE IF NOT EXISTS customers (
	customer_id TINYINT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
	order_id TINYINT PRIMARY KEY,
    customer_id TINYINT NOT NULL,
    FOREIGN KEY fkey_customer_order (customer_id) REFERENCES customers (customer_id)
);

ALTER TABLE customers ADD email VARCHAR(50) NOT NULL UNIQUE AFTER last_name;


ALTER TABLE customers ENGINE = InnoDB;
SHOW ENGINES