DROP PROCEDURE IF EXISTS get_payments;

DELIMITER ??
CREATE PROCEDURE get_payments ()
	BEGIN
		SELECT * FROM payments;
	END??
DELIMITER ;

CALL get_payments