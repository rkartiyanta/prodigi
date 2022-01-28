INSERT INTO "role" VALUES('ADMIN');
INSERT INTO "role" VALUES('CUSTOMER');

INSERT INTO "account"("name", "email", "password", "role") VALUES('User 1', 'email1@example.com', 
    'password', 'ADMIN');
INSERT INTO "account"("name", "email", "password", "role") VALUES('User 2', 'email2@example.com', 
    'password', 'CUSTOMER');

INSERT INTO "product"("name", "description", "brand", "type", "price", "image_url")
    VALUES('Macbook Pro M1 (14) - 2021', 'Macbook Pro 14 inch, Chip M1, 2021', 'apple', 'laptop', 30000000,
    '{"http://urlexample.com/prod1/1.jpg", "http://urlexample.com/prod1/2.jpg", "http://urlexample.com/prod1/3.jpg"}');
INSERT INTO "product"("name", "description", "brand", "type", "price", "image_url")
    VALUES('Macbook Pro M1 (15) - 2021', 'Macbook Pro 15 inch, Chip M1, 2021', 'apple', 'laptop', 40000000,
    '{"http://urlexample.com/prod2/1.jpg", "http://urlexample.com/prod2/2.jpg", "http://urlexample.com/prod2/3.jpg",
    "http://urlexample.com/prod2/4.jpg"}');

INSERT INTO "wishlist" VALUES(2, 1);