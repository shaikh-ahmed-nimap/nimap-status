SELECT MAX(invoice_total) AS max_invoice, 
MIN(invoice_total) AS min_invoice, AVG(invoice_total) AS avg_invoice, COUNT(DISTINCT client_id) FROM invoices;

SELECT 'first half of 2019' as Date_Range, 
SUM(invoice_total) AS total_sales, 
SUM(payment_total) as total_payment,
SUM(invoice_total - payment_total) as we_expect
FROM invoices WHERE payment_date < '2019-02-01'
UNION
SELECT 'second half of 2019' as Date_Range, 
SUM(invoice_total) AS total_sales, 
SUM(payment_total) as total_payment,
SUM(invoice_total - payment_total) as we_expect
FROM invoices WHERE payment_date >= '2019-02-01'
union
SELECT 'total' as Date_Range, 
SUM(invoice_total) AS total_sales, 
SUM(payment_total) as total_payment,
SUM(invoice_total - payment_total) as we_expect
FROM invoices;