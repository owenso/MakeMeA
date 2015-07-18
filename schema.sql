DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS files CASCADE;


CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	wantmade TEXT,
	geoloc VARCHAR(255),
	avatar_url TEXT

)

CREATE TABLE files(
	id SERIAL PRIMARY KEY,
	url TEXT,
	votes INTEGER,
	chosen BOOLEAN,
	filetype VARCHAR(255),
	dateuploaded DATE,
	users_id INTEGER references users,

	)