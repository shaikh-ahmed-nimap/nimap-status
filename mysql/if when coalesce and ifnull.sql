USE sql_store;

SELECT order_id, IFNULL(shipper_id, 'NOT ASSIGNED') FROM orders;
SELECT CONCAT(first_name, " ", last_name) AS FullName, IFNULL(phone, 'UNKNOWN') FROM customers;
SELECT CONCAT(first_name, " ", last_name) AS FullName, coalesce(phone, address, 'unknown') FROM customers;

-- IF statement
SELECT order_id, order_date, IF(YEAR(order_date) = YEAR('2019-10-21'), 'ACTIVE', 'ARCHIVE') FROM orders; 

select (EXTRACT(YEAR FROM order_date)), year('2019-10-02') FROM orders;

SELECT p.product_id, p.name AS product_name, count(oi.product_id) AS order_count, IF(COUNT(oi.product_id) > 1, 'Many times', 'Once') 
AS 'frequency' FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name;

SELECT p.product_id, p.name AS product_name, 
(SELECT COUNT(oi.product_id) AS count_order FROM order_items oi WHERE p.product_id = oi.product_id GROUP BY p.product_id) AS order_count,
IF((SELECT COUNT(oi.product_id) AS count_order FROM order_items oi WHERE p.product_id = oi.product_id GROUP BY p.product_id) > 1, 'Many times', 'once') 
AS how_many_times_ordered
FROM products p
WHERE EXISTS
(SELECT product_id FROM order_items WHERE order_items.product_id = p.product_id);

SELECT product_id FROM products p WHERE NOT EXISTS
(SELECT product_id FROM order_items WHERE p.product_id = product_id);


-- CASE OPERATOR;
SELECT order_id, order_date,
	CASE
		WHEN YEAR(order_date) = YEAR('2019-01-01') THEN 'ACTIVE'
        WHEN YEAR(order_date) = YEAR('2019-01-01') - 1 THEN 'LAST_YEAR'
        WHEN YEAR(order_date) < YEAR('2019-01-01') - 1 THEN 'ARCHIVED'
		ELSE 'FUTURE'
	END
AS category
FROM orders;

SELECT CONCAT(first_name, " ", last_name) AS cusomter, points, 
	CASE
		WHEN points > 3000 THEN 'GOLD'
        WHEN points <= 3000 AND points > 2000 THEN 'SILVER'
        ELSE 'BRONZE'
	END 'category'
FROM customers;