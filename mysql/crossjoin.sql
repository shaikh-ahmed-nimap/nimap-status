SELECT * FROM shippers;
SELECT * FROM products;

SELECT sh.name AS shipper, p.name as product FROM products p CROSS JOIN shippers sh;

-- explecit code
SELECT sh.name as shipper, p.name as product FROM products p, shippers sh 