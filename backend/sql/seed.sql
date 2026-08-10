INSERT INTO orders (user_id, status, total)
VALUES
(1, 'In progress', 76.99),
(2, 'Completed', 30.00),
(3, 'Delayed', 83.99);

INSERT INTO order_items (order_id, products_id, quantity, price)
VALUES
(1, 2, 4, 56.99),
(2, 3, 1, 88.00),
(3, 1, 1, 9.99);