CREATE DEFINER=`root`@`localhost` PROCEDURE `get_product_with_id`(
	product_id TINYINT
)
BEGIN
	SELECT product_id, product_name, description, price, in_stock FROM products p WHERE p.product_id = product_id;
END