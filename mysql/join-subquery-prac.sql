USE sql_store;

SELECT first_name, last_name,
	(
		SELECT COUNT(order_id) FROM orders o WHERE o.customer_id = c.customer_id
	) as orders
FROM customers c;

SELECT first_name, last_name, COUNT(order_id) AS orders FROM customers c
RIGHT JOIN orders o ON o.customer_id = c.customer_id GROUP BY first_name, last_name;

SELECT first_name, last_name, (
	SELECT COUNT(order_id) FROM orders os WHERE os.customer_id = c.customer_id
) AS order_count FROM customers c WHERE c.customer_id IN (
	SELECT customer_id FROM orders o
);

SELECT o.order_id, (
	SELECT s.name FROM order_statuses s WHERE o.status = s.order_status_id
) AS status, o.order_date, o.shipped_date, (
	SELECT sh.name FROM shippers sh WHERE sh.shipper_id = o.shipper_id
) AS 'shipped by', (
	SELECT concat(c.first_name, ' ', c.last_name) FROM customers c WHERE o.customer_id = c.customer_id
) AS ordered_by, (
	SELECT COUNT(oi.product_id) FROM order_items oi WHERE oi.order_id = o.order_id
) AS product_count
FROM orders o;

SELECT o.order_id, s.name, o.order_date, CONCAT(c.first_name, ' ', c.last_name) AS ordered_by,
o.shipped_date,
ifnull(sh.name, 'not shipped yet') AS 'shipped by',
p.name AS product
FROM orders o
LEFT JOIN customers c ON c.customer_id = o.customer_id
LEFT JOIN order_statuses s ON o.status = s.order_status_id
LEFT JOIN shippers sh ON o.shipper_id = sh.shipper_id
LEFT JOIN order_items oi ON oi.order_id = o.order_id
LEFT JOIN products p ON p.product_id = oi.product_id;

