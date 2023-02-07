CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_product`(
	product_id TINYINT
)
BEGIN
	SELECT product_id FROM products p WHERE p.product_id = product_id;
	DELETE FROM products p WHERE p.product_id = product_id;
END