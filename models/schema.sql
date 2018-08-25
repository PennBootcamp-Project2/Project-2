DROP DATABASE IF EXISTS readerdb;
CREATE DATABASE readerdb; 
USE readerdb;
CREATE TABLE books
(
	book_id int NOT NULL AUTO_INCREMENT,
    isbn int NOT NULL,
	title varchar (255) NOT NULL, 
    author varchar (255) NOT NULL,
    purchase_link varchar(255) NOT NULL,
    price int NULL,
    average_rating DEC NOT NULL,
    description varchar(2000) NOT NULL,
	PRIMARY KEY (book_id)
);

CREATE TABLE users
(
	user_id int NOT NULL AUTO_INCREMENT, 
    username varchar (255) NOT NULL,
	password varchar (2000) NOT NULL,
    email varchar (255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE bookUserJoin
(
	user_id int NOT NULL, 
    book_id int NOT NULL
);

