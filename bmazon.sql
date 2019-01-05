DROP DATABASE IF EXISTS bmazon_db;
CREATE DATABASE bmazon_db;

USE bmazon_db;

CREATE TABLE products(
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INTEGER(100),
    stock_quantity INTEGER(100),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", 'Electronics', 1000, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", 'Electronics', 100, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ice cream", 'Food', 8, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beer", 'Food', 5, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", 'Food', 3, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts", 'Clothing', 30, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", 'Clothing', 40, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", 'Sports', 35, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", 'Sports', 45, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", 'Beauty', 15, 145);

