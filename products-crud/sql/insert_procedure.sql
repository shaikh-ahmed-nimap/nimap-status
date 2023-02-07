CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_product`(
	product_name VARCHAR(255),
    description TEXT,
    price DECIMAL(5, 2),
    in_stock BOOLEAN
)
BEGIN
	INSERT INTO products (product_name, description, price, in_stock) 
    VALUES (product_name, IFNULL(description, NULL), price, IFNULL(in_stock, TRUE));
    SELECT * FROM products WHERE product_id = LAST_INSERT_ID();
END