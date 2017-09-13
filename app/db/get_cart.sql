SELECT products.*, cart.*
FROM cart
JOIN products 
ON products.id = cart.productid
WHERE cart.orderid = $1;