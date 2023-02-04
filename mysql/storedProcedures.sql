DELIMITER $$
CREATE PROCEDURE get_client()
BEGIN
	SELECT * FROM clients;
END$$
DELIMITER ;

CALL get_client();

DELIMITER $$
CREATE PROCEDURE get_invoices_with_balance ()
BEGIN
	SELECT 
		invoice_id,
		number,
		client_id,
		(invoice_total - payment_total) AS balance,
		invoice_date,
		due_date,
		payment_date
	FROM invoices
	WHERE (invoice_total - payment_total) > 0;
END$$
DELIMITER ;

call get_invoices_with_balance();

DROP PROCEDURE IF EXISTS get_payments;

CALL get_client_with_state(NULL);

call get_invoices_by_client(1);