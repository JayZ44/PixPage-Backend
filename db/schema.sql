DROP DATABASE IF EXISTS pixpage; -- change name of dbw
CREATE DATABASE pixpage; -- change name of db

\c pixpage;


CREATE TABLE grids(
    id serial primary key,
    title varchar(40),
    creator varchar(40),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    grid_size int
);

CREATE TABLE squares(
    id serial primary key,
    coordinates varchar(3),
    color varchar(20),
    grid_id int REFERENCES grids(id)
);