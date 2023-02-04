USE  sql_invoicing;

CREATE VIEW sales_by_client AS
SELECT cl.client_id, cl.name, SUM(invoice_total) AS invoice FROM clients cl
JOIN invoices i USING(client_id) 
GROUP BY cl.client_id, cl.name;


SELECT * FROM sales_by_client WHERE invoice > 500;

CREATE OR REPLACE VIEW client_balance AS
SELECT client_id, name, SUM(i.invoice_total - i.payment_total) AS balance FROM clients
JOIN invoices i USING (client_id)
GROUP BY client_id, name;

SELECT * FROM client_balance