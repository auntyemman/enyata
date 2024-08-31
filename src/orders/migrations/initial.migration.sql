CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customerId INT REFERENCES users(id),
    totalAmount NUMERIC(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    orderId INT REFERENCES orders(id),
    productId INT REFERENCES products(id),
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);