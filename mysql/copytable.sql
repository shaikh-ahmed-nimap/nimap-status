DROP TABLE IF EXISTS archive_products;
CREATE TABLE sql_store.archive_products AS SELECT * FROM products;

USE sql_invoicing;

INSERT INTO invoices_archived
SELECT i.invoice_id, i.number, cl.name AS client, i.payment_total, i.invoice_date, i.due_date, i.payment_date FROM invoices i
JOIN clients cl USING (client_id) WHERE i.payment_date IS NOT NULL;
