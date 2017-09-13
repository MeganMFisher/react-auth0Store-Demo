-- SELECT *
-- FROM users
-- JOIN orders ON orders.id = users.id
-- JOIN cart ON cart.orderId = orders.id
-- JOIN products ON cart.productId = products.id
-- WHERE users.auth_id = $1;

SELECT users.*, orders.id AS orderid
FROM users
JOIN orders 
ON orders.userId = users.id
WHERE orders.complete = false && user.id = $1;