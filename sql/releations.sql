CREATE DATABASE mydb;


CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
);

CREATE TYPE USER_STATUS_TYPE AS ENUM("blocked","active","deactive");

CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lat REAL CHECK(lat is NULL OR (lat >=-90 AND lat <=90)),
    lng REAL CHECK(lng is NULL OR (lng >=-180 AND lng <=180))
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    supervisorId INT REFERENCES users(id) ON DELETE SET NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    teamId INT NOT NULL REFERENCES teams(id) ON DELETE SET NULL,
    isActive BOOLEAN DEFAULT TRUE,
    rate SMALLINT NOT NULL CHECK (rate >= 0 AND rate <= 10),
    salary NUMERIC(6,2) NOT NULL,                               -- DECIMAL , NUMERIC --> 1234.56
    yearlySalary FLOAT NOT NULL,                                -- REAL , DOUBLE , FLOAT --> FLOAT(5,2) --> 123.45
    status USER_STATUS_TYPE,
    CHECK (yearlySalary > salary),
    CHECK (COAlESCE(email,phone) IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    isActive BOOLEAN DEFAULT TRUE,
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    scheduledAt DATE DEFAULT CURRENT_DATE,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    isActive BOOLEAN DEFAULT TRUE,
);


CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
);



CREATE TABLE IF NOT EXISTS users_events (
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    eventId INT NOT NULL REFERENCES events (id) ON DELETE CASCADE,
    PRIMARY KEY (userId,eventId)
);


CREATE TABLE IF NOT EXISTS users_friends (
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friendId INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (userId,friendId),
    check(userId<friendId)
);

CREATE TABLE IF NOT EXISTS users_projects (
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    projectId INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (userId,projectId),
);


-- CREATE TABLE IF NOT EXISTS likes (
--     id SERIAL PRIMARY KEY,
--     createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     postId INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
--     commentId INT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
--     CHECK (COAlESCE((postId)::BOOLEAN::INTEGER, 0) + COAlESCE((commentId)::BOOLEAN::INTEGER, 0) = 1),
--     UNIQUE (userId, postId, commentId)
-- );


-- SELECT booking_date, amount_tipped, SUM(amount_tipped) OVER ()
-- FROM bookings;

-- SELECT booking_date, amount_tipped, SUM(amount_tipped) OVER (PARTITION BY booking_date)
-- FROM bookings;

-- SELECT booking_date, amount_tipped, SUM(amount_tipped) OVER (PARTITION BY booking_date ORDER BY amount_billed ASC)
-- FROM bookings;


-- BEGIN;
-- COMMIT;
-- ROLLBACK;




-- CREATE VIEW recent_posts AS (
--     SELECT title, userId 
--     FROM posts 
--     ORDER BY createdAt LIMIT 10
-- );

-- CREATE OR REPLACE VIEW recent_posts AS (
--     SELECT title, userId 
--     FROM posts 
--     ORDER BY createdAt DESC LIMIT 15
-- );

-- DROP VIEW recent_posts;


-- SHOW data_directory;


-- SELECT oid, datname from pg_database;
-- SELECT * FROM pg_class;
-- SELECT relname, relkind from pg_class WHERE relkind='i';


-- SELECT pg_size_pretty(pg_relation_size('users'));
-- SELECT pg_size_pretty(pg_relation_size('users_username_idx'));


-- CREATE INDEX ON users (username);
-- DROP INDEX users_username_idx;


-- EXPLAIN ANALYZE SELECT * FROM users WHERE username='Farid';