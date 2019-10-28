DROP DATABASE IF EXISTS closet_db;

CREATE DATABASE closet_db;

USE closet_db;

CREATE TABLE shoes (
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(50),
    temp INTEGER,
    waterProof BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE tops (
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(50),
    temp INTEGER,
    waterProof BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE bottoms (
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(50),
    temp INTEGER,
    waterProof BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE accessories (
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(50),
    temp INTEGER,
    waterProof BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
)