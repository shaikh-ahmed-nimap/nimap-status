USE sql_store;
SELECT * FROM products p WHERE p.unit_price > 
(SELECT p.unit_price FROM products p WHERE p.name LIKE 'Lettuce%');

select product_id, name from products p where NOT EXISTS (
	SELECT DISTINCT product_id FROM order_items WHERE product_id = p.product_id
);

USE sql_hr;

SELECT * FROM employees WHERE salary > (
	SELECT AVG(salary) FROM employees
);

USE sql_store;

SELECT DISTINCT c.customer_id, c.first_name, c.last_name  FROM customers c
JOIN orders o USING (customer_id)
JOIN order_items oi USING (order_id)
LEFT JOIN products p USING (product_id)
WHERE p.name LIKE 'Lettuce%';

SELECT c.customer_id, c.first_name, c.last_name FROM customers c
WHERE customer_id IN (
	SELECT customer_id FROM orders WHERE order_id IN
(
 SELECT DISTINCT order_id FROM order_items WHERE product_id = (
	SELECT product_id FROM products WHERE name LIKE 'Lettuce%'
 )
)
);


SELECT * FROM products WHERE product_id NOT IN (
SELECT DISTINCT product_id FROM order_items);

USE sql_invoicing;

SELECT client_id, name, (
	SELECT SUM(invoice_total) FROM invoices WHERE client_id = c.client_id
) AS total_invoices_by_client, (
	SELECT AVG(invoice_total) FROM invoices
) AS invoice_average, (SELECT total_invoices_by_client - invoice_average) AS difference FROM clients c;

SELECT invoice_id, invoice_total, 
(SELECT AVG(invoice_total) FROM invoices) AS invoice_average,
invoice_total - (SELECT invoice_average) 
FROM invoices;

SELECT * FROM clients WHERE client_id NOT IN (
SELECT distinct client_id FROM invoices);

SELECT cl.client_id, cl.name, i.invoice_id FROM clients cl
LEFT JOIN invoices i USING (client_id)
WHERE i.invoice_id IS NULL;

SELECT * FROM invoices 
WHERE invoice_total > ( SELECT MAX(invoice_total) FROM invoices WHERE client_id = 3)
;

SELECT * FROM invoices WHERE invoice_total > ALL(
	SELECT invoice_total
    FROM invoices WHERE client_id = 3
);

SELECT * FROM clients WHERE client_id = ANY
(
	SELECT client_id FROM invoices GROUP BY client_id HAVING COUNT(invoice_id) > 1
);

SELECT invoice_total FROM invoices i WHERE invoice_total > (
	SELECT AVG(invoice_total) FROM invoices WHERE client_id = i.client_id
);

SELECT client_id FROM clients c WHERE EXISTS (
	SELECT client_id FROM invoices WHERE c.client_id = client_id
);

USE sql_hr;

SELECT * FROM employees e WHERE salary > (
	SELECT AVG(salary) FROM employees WHERE office_id = e.office_id
);

