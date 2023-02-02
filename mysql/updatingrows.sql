UPDATE invoices SET payment_total = 10, payment_date = '2023-01-10' WHERE invoice_id = 1;

USE sql_store;

UPDATE customers SET points = points + 50 WHERE birth_date < '1990-01-01';

USE sql_invoicing;

UPDATE invoices SET payment_total = invoice_total * 0.5, payment_date = '2022-12-31' WHERE client_id
 IN (SELECT client_id FROM clients WHERE state IN ('CA', 'NY'));
 
 USE sql_store;
 
 UPDATE orders SET comments = 'GOLD USERS' WHERE customer_id IN (SELECT customer_id FROM customers WHERE points > 3000);