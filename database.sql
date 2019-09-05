
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);

INSERT INTO "item"("description","image_url","user_id")
VALUES ('calculator','https://www.staples-3p.com/s7/is/image/Staples/sp36292377_sc7?wid=512&hei=512',1),('Vikings hard hat','https://www.discountsafetygear.com/media/catalog/product/cache/10/image/9df78eab33525d08d6e5fb8d27136e95/M/S/MSA818400_-00_Minnesota-Vikings-V-Gard-Hard-Hat.jpg', 1),('css book', 'https://images-na.ssl-images-amazon.com/images/I/41p7u2kJACL._SX396_BO1,204,203,200_.jpg', 2);
