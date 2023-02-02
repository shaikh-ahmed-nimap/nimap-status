SELECT * FROM customers c
JOIN orders o 
ON c.customer_id = o.customer_id;

SELECT * FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;

SELECT p.*, oi.order_id, oi.quantity FROM products p
RIGHT OUTER JOIN order_items oi ON p.product_id = oi.product_id;

SELECT o.order_id, c.first_name, s.shipper_id, s.name FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN shippers s ON s.shipper_id = o.shipper_id;

SELECT o.order_date, o.order_id, c.first_name AS customer, s.name AS shipper,os.name FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN shippers s ON s.shipper_id = o.shipper_id
JOIN order_statuses os ON os.order_status_id = o.status;

USE sql_hr;

SELECT e.employee_id, e.first_name, m.first_name as manage FROM employees e
LEFT JOIN employees m ON e.reports_to = m.employee_id;