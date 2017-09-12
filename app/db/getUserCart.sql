-- SELECT *
-- FROM users
-- JOIN orders ON orders.id = users.id
-- JOIN cart ON cart.orderId = orders.id
-- JOIN products ON cart.productId = products.id
-- WHERE users.auth_id = $1;

SELECT * 
FROM users
WHERE id = $1;