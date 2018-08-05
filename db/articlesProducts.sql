\c postgres

DROP USER IF EXISTS knex_user;
DROP DATABASE IF EXISTS knex_articles_products;

CREATE USER knex_user WITH PASSWORD 'password';
CREATE DATABASE knex_articles_products WITH OWNER knex_user;

\c knex_articles_products knex_user

-- CREATE TABLE articles (
--   id serial NOT NULL PRIMARY KEY,
--   author varchar(255) NOT NULL,
--   body varchar(1024) NOT NULL,
--   title varchar(255) NOT NULL,
--   urlTitle varchar (255),
--   created_at timestamp NOT NULL now(),
--   updated_at timestamp NOT NULL now()
-- );

-- CREATE TABLE products (
--   id serial NOT NULL PRIMARY KEY,
--   name varchar(255) NOT NULL,
--   inventory integer,
--   price decimal(8,2),
--   created_at timestamp NOT NULL now(),
--   updated_at timestamp NOT NULL now()
-- );

-- INSERT INTO articles VALUES(
--   default,
--   'bob',
--   'Lorizzle ipsum dolizzle sit brizzle, consectetuer adipiscing elit. Nullizzle yo velizzle, fo shizzle volutpizzle, arzipizzle shizznit, gravida boofron, arcu. Pellentesque eget tortor. Dope erizzle. Black izzle dizzling dapogizzle gangster Tempus tempizzle. Mauris pellentesque fresh funky we gonna chung turpizzle. Ass izzle i saw beyonce tizzles and my pizzle went crizzle. Pellentesque eleifend rhoncizzle things. In fizzle you have a bizzle platea daahng dawg. Donec dapibizzle. Mofo tellizzle urna, gangsta izzle, mattis boofron, eleifend gangsta, nunc. I saw beyonces tizzles and my pizzle went to cryzzle aroused. Integer pimpin,',
--   'bobTitle',
--   default
-- );

-- INSERT INTO products VALUES(
--   default,
--   'shoe', 
--   '5', 
--   '50' 
-- );