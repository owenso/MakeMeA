DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS requests CASCADE;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	geoloc VARCHAR(255),
	avatar_url TEXT,
	email VARCHAR(255),
	chosen INTEGER,
	submissions INTEGER
);

CREATE TABLE requests(
	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	daterequested DATE,
	users_id INTEGER references users
);
CREATE TABLE files(
	id SERIAL PRIMARY KEY,
	url TEXT,
	votes INTEGER,
	chosen BOOLEAN,
	filetype VARCHAR(255),
	dateuploaded DATE,
	users_id INTEGER references users,
	requests_id INTEGER references requests
	)
