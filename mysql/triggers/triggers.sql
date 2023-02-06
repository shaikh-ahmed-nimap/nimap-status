USE sql_invoicing;

DELIMITER $$
CREATE TRIGGER payments_after_insert
AFTER INSERT ON payments
FOR EACH ROW
BEGIN
 UPDATE invoices SET payment_total = payment_total + NEW.amount
 WHERE invoice_id = NEW.invoice_id;
END $$
DELIMITER ;

INSERT INTO payments VALUES(
	DEFAULT, 5,3, '2023-02-06', 20.50, 2
);
DROP TRIGGER IF EXISTS payments_after_delete;
DELIMITER $$

CREATE TRIGGER payments_after_delete 
AFTER DELETE ON payments
FOR EACH ROW
BEGIN
	UPDATE invoices SET payment_total = payment_total - OLD.amount
    WHERE invoice_id = OLD.invoice_id;
END$$
DELIMITER ;

DELETE FROM payments WHERE payment_id = 11;

SHOW TRIGGERS LIKE 'payments%';

DROP TRIGGER IF EXISTS paymets_after_delete;

SELECT * FROM sql_invoicing.payments_audit;

SHOW VARIABLES LIKE 'event%';
