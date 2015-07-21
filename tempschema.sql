DROP TABLE IF EXISTS files CASCADE;

CREATE TABLE files(
	id SERIAL PRIMARY KEY,
	url TEXT,
	votes INTEGER,
	chosen BOOLEAN,
	description TEXT,
	filetype VARCHAR(255),
	dateuploaded DATE,
	users_id INTEGER references users,
	requests_id INTEGER references requests
	)