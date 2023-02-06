UPDATE products SET properties = JSON_REMOVE(properties, '$.age')
WHERE product_id = 1;

SELECT product_id, properties -> '$.weight', properties -> '$.age' AS age FROM products WHERE product_id = 1;