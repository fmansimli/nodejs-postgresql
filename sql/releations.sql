CREATE DATABASE IF NOT EXISTS mydb;


CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive:BOOLEAN DEFAULT TRUE,
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    supervisorId:INT REFERENCES users(id) ON DELETE SET NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    teamId: INT NOT NULL REFERENCES teams(id) ON DELETE SET NULL,
    isActive:BOOLEAN DEFAULT TRUE,
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    userId: INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    isActive:BOOLEAN DEFAULT TRUE,
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    scheduledAt DATE DEFAULT CURRENT_DATE,
    userId: INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    isActive:BOOLEAN DEFAULT TRUE,
);


CREATE TABLE IF NOT EXISTS projects (
    id:SERIAL PRIMARY KEY,
    name:VARCHAR(150) NOT NULL,
    description:VARCHAR(1000) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive:BOOLEAN DEFAULT TRUE,
);



CREATE TABLE IF NOT EXISTS users_events (
    userId:INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    eventId:INT NOT NULL REFERENCES events (id) ON DELETE CASCADE,
    PRIMARY KEY (userId,eventId)
);


CREATE TABLE IF NOT EXISTS users_friends (
    userId:INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friendId:INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (userId,friendId),
    check(userId<friendId)
);

CREATE TABLE IF NOT EXISTS users_projects (
    userId:INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    projectId:INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (userId,projectId),
);

