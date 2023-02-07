EXPLAIN SELECT customer_id FROM customers WHERE customer_id = 500;

EXPLAIN SELECT customer_id FROM customers WHERE points > 1000;

DROP INDEX idx_points ON customers;
CREATE INDEX idx_points ON customers (points);

SHOW INDEXES IN customers;

ANALYZE TABLE customers;

SHOW INDEXES IN orders;

CREATE INDEX idx_last_name ON customers (last_name(5));

SELECT * FROM customers WHERE last_name LIKE 'chev%';

SELECT COUNT(DISTINCT LEFT(last_name, 5)) FROM customers;

USE sql_blog;

CREATE FULLTEXT INDEX idx_title_body ON posts (title, body);
SELECT * FROM posts WHERE MATCH(title, body) AGAINST ('"Handel react form"' IN BOOLEAN MODE);

USE sql_store;
SHOW INDEXES IN customers;
CREATE INDEX idx_state ON customers (state);

DROP INDEX idx_points ON customers;
DROP INDEX idx_state ON customers;

CREATE INDEX idx_state_points ON customers (state, points);

EXPLAIN SELECT customer_id FROM customers
USE INDEX (idx_state_last_name)
WHERE state = 'CA' AND last_name like 'A%';

EXPLAIN SELECT customer_id FROM customers WHERE state = 'CA' OR points > 1000;

CREATE INDEX idx_last_name_state ON customers(last_name, state);
CREATE INDEX idx_state_last_name ON customers (state, last_name);

SELECT COUNT(DISTINCT last_name), COUNT(DISTINCT state) FROM customers;

SHOW INDEXES IN customers;
SELECT COUNT(DISTINCT points), COUNT(DISTINCT state) FROM customers;

EXPLAIN SELECT * FROM customers WHERE state = 'CA' OR points > 1000;