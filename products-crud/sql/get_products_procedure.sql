CREATE DEFINER=`root`@`localhost` PROCEDURE `get_products`()
BEGIN
	SELECT product_id, product_name, price, in_stock FROM products;
END