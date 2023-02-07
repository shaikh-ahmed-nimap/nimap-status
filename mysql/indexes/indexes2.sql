SHOW INDEXES IN customers;

DROP INDEX idx_state_last_name ON customers;
DROP INDEX idx_last_name_state ON customers;

EXPLAIN SELECT customer_id FROM customers ORDER BY state, first_name, points;

SHOW STATUS LIKE 'last_query_cost';