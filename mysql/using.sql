SELECT o.order_id, c.first_name as customer, sh.name as shipper FROM orders o
JOIN customers c USING (customer_id)
LEFT JOIN shippers sh USING (shipper_id);

SELECT p.date, cl.name as client, p.amount, pm.name AS payment_method FROM payments p
JOIN clients cl USING (client_id)
JOIN payment_methods pm ON pm.payment_method_id = p.payment_method;

