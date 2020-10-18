CREATE DATABASE nastiprazdnik;
use nastiprazdnik;
CREATE TABLE reviews (
id INT NOT NULL AUTO_INCREMENT,
author TINYTEXT,
avatarImage TINYTEXT,
avatarColor TINYTEXT,
text TEXT,
photos TEXT DEFAULT NULL,
PRIMARY KEY (id)
);