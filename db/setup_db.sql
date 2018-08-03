\c postgres

DROP USER IF EXISTS knex_user;
DROP DATABASE IF EXISTS knex_articles_products;

CREATE USER knex_user WITH PASSWORD 'password';
CREATE DATABASE knex_articles_products WITH OWNER knex_user;

