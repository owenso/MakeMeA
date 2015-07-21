DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS requests CASCADE;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
	firstname VARCHAR(255),
	password VARCHAR(255),
	lastname VARCHAR(255),
	country VARCHAR(255),
	city VARCHAR(255),
	region VARCHAR(255),
	avatar TEXT DEFAULT 'avatars/avatar-blank.jpg',
	email VARCHAR(255),
	chosen INTEGER DEFAULT 0,
	submissions INTEGER DEFAULT 0
);

CREATE TABLE requests(
	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	filled BOOLEAN DEFAULT FALSE,
	votes INTEGER DEFAULT 0,
	daterequested timestamp DEFAULT current_timestamp,
	users_id INTEGER references users
);
CREATE TABLE files(
	id SERIAL PRIMARY KEY,
	url TEXT,
	votes INTEGER DEFAULT 0,
	chosen BOOLEAN DEFAULT FALSE,
	description TEXT,
	filetype VARCHAR(255),
	dateuploaded timestamp DEFAULT current_timestamp,
	users_id INTEGER references users,
	requests_id INTEGER references requests
	)
