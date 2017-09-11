DROP TABLE IF EXISTS users

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180),
  auth_id TEXT 
);


CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(180),
    image TEXT,
    price VARCHAR(180),
    description TEXT
)

-- INSERT INTO products (name, image, price, description)
-- VALUES ('', '', '$45.00', ''),
-- ('', '', '$72.00', ''),
-- ('', '', '$67.00', ''),
-- ('', '', '$84.00', ''),
-- ('', 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=48303510', '$40.00', ''),
-- ('', '', '$53.00', ''),

