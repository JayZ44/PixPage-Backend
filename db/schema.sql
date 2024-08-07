DROP DATABASE IF EXISTS pixpage; -- change name of dbw
CREATE DATABASE pixpage; -- change name of db

\c pixpage;


CREATE TABLE creators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL,
    bio VARCHAR(300)
);

CREATE TABLE grids (
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    grid_size INT,
    creator VARCHAR(40) NOT NULL,
    creator_id INT NOT NULL,
    FOREIGN KEY (creator) REFERENCES creators(name) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE CASCADE
);

CREATE TABLE squares (
    id SERIAL PRIMARY KEY,
    coordinates VARCHAR(3),
    color VARCHAR(20),
    grid_id INT NOT NULL,
    FOREIGN KEY (grid_id) REFERENCES grids(id) ON DELETE CASCADE
);
