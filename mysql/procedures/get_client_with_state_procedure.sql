DROP PROCEDURE IF EXISTS get_client_with_state;

DELIMITER $$
CREATE PROCEDURE get_client_with_state (
	state CHAR(2)
)
BEGIN
	SELECT * FROM clients c
	WHERE c.state = IFNULL(state, c.state);
END$$

DELIMITER ;