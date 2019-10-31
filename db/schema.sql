DROP DATABASE IF EXISTS closet_db;
CREATE DATABASE closet_db;

use closet_db;

INSERT INTO 
	Closets (name, type, color, temp, waterProof) 
VALUES 
	('vans', "shoe", "white", "warm", false),
    ('jordans', "top", "white", "warm", false),
    ('keds', "shoe", "white", "warm", false),
    ('adidas', "bottom", "white", "warm", false),
    ('nikes', "accessory", "white", "warm", false);