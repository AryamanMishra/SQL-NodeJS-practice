CREATE TABLE users(
    first_name VARCHAR(255) NOT NULL ,
    last_name VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL 
);
SELECT * from users;
ALTER TABLE users ADD  password VARCHAR(255) NOT NULL ;
DELETE FROM users;

SELECT * FROM users WHERE email= AND password=;
ALTER table users DROP email;
ALTER TABLE users ADD PRIMARY KEY (id);