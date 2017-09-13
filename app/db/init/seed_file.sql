DROP TABLE IF EXISTS users, products, orders, cart;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180),
  auth_id TEXT 
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(180),
    image TEXT,
    price TEXT,
    description TEXT
);

INSERT INTO products (name, image, price, description)
VALUES ('Anna Jacket', 'https://i.pinimg.com/736x/a0/5d/0c/a05d0ccccc2011b8833b3edd2c56b86c.jpg', '45.00', 'Hunter Green'),
('Ember Jacket', 'https://i.pinimg.com/736x/11/32/61/1132617063ffce6fe4cfe681371f2d3c--leather-motorcycle-jackets-faux-leather-jackets.jpg', '72.00', 'Brown and Hunter Green'),
('Emily Jacket', 'https://images-na.ssl-images-amazon.com/images/I/41JOAT7K2PL._AC_UL260_SR200,260_.jpg', '67.00', 'Hunter Green'),
('Lennox Jacket', 'https://i.pinimg.com/736x/8c/1e/fd/8c1efd38eb8fa806b0e4b4db15ec725e--fall-jackets-military-jackets.jpg', '84.00', 'Black with Gold Zippers'),
('Aria Jacket', 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=48303510', '40.00', 'Black'),
('Emery Jacket', 'https://www.muubaa.com/images/products/zoom/1355323849-07946200.jpg', '53.00', 'Black Leather Biker Jacket');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    complete BOOLEAN,
    userId INTEGER REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS cart (
    productId INTEGER REFERENCES products (id),
    orderId INTEGER REFERENCES orders (id),
    quantity INTEGER 
);

