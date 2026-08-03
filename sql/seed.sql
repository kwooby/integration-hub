INSERT INTO users (name, email)
VALUES
('Al John', 'aljohn@test.com'),
('Pat Murphy', 'murphpat@test.com'),
('Charles Boing', 'boingman@test.com');

INSERT  INTO products (sku, name, price)
VALUES
('sku-001', 'casual laptop', 899.99),
('sku-002', 'plant', 29.99),
('sku-003', 'keyboard', 129.99);

INSERT INTO inventory (product_id, quantity)
VALUES
(1, 20),
(2, 50),
(3, 54);