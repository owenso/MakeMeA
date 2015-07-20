DROP TABLE IF EXISTS requests CASCADE;

CREATE TABLE requests(
	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	filled BOOLEAN,
	daterequested DATE DEFAULT current_timestamp,
	users_id INTEGER references users
);