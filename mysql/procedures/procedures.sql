DROP PROCEDURE IF EXISTS get_payments;

DELIMITER $$
CREATE PROCEDURE get_payments (
	client_id INT,
    payment_method_id TINYINT
)
BEGIN
	SELECT * FROM payments p
    WHERE p.client_id = IFNULL(client_id, p.client_id) AND p.payment_method = IFNULL(payment_method_id, p.payment_method);
END$$

DELIMITER ;

CALL get_payments(NULL, NULL);

DROP PROCEDURE IF EXISTS get_unpaid_invoices_by_client;

DELIMITER $$
CREATE PROCEDURE get_unpaid_invoices_by_client (
	client_id INT,
    OUT invoice_count TINYINT,
    OUT invoice_total DECIMAL(9, 2)
)
BEGIN
	SELECT COUNT(*), SUM(invoice_total) INTO invoice_count, invoice_total FROM invoices i
    WHERE i.client_id = client_id;
END$$

DELIMITER ;

CALL get_unpaid_invoices_by_client(2);

DROP PROCEDURE IF EXISTS calculate_risk_factor;

DELIMITER $$
CREATE PROCEDURE calculate_risk_factor ()
BEGIN
	DECLARE risk_factor DECIMAL(9, 2) DEFAULT 0;
    DECLARE invoices_total DECIMAL(9, 2);
    DECLARE invoice_count INT;
	SELECT COUNT(*), SUM(invoice_total)
    INTO invoice_count, invoices_total FROM invoices;
    SET risk_factor = invoices_total / invoice_count * 5;
    SELECT risk_factor;
END$$
DELIMITER ;

CALL calculate_risk_factor();2
