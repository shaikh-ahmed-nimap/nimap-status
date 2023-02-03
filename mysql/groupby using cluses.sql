USE sql_invoicing;
SELECT date as payment_date, pm.name, SUM(amount) AS total_payments FROM payments
JOIN payment_methods pm ON payments.payment_method = pm.payment_method_id
GROUP BY payment_date, pm.name
ORDER BY payment_date;

SELECT client_id, SUM(payment_total) as payment_total, COUNT(*) AS total_invoicing FROM invoices GROUP BY client_id
HAVING payment_total > 100 AND total_invoicing > 5;

USE sql_store;

SELECT c.customer_id, c.first_name, c.last_name, SUM(oi.quantity*oi.unit_price) AS total_spend 
FROM customers c
JOIN orders o USING (customer_id)
JOIN order_items oi USING (order_id)
WHERE c.state = 'VA'
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING total_spend > 100;

SELECT SUM(amount), pm.name FROM payments
JOIN payment_methods pm ON payments.payment_method = pm.payment_method_id
GROUP BY pm.name WITH ROLLUP;

