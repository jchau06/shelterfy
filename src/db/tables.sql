CREATE TABLE IF NOT EXISTS login_info (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(40) NOT NULL,
);

CREATE TABLE IF NOT EXISTS locations(
    loc_id SERIAL PRIMARY KEY,
    address_line_one TEXT NOT NULL,
    address_line_two TEXT,
    locality TEXT,
    state_abbr VARCHAR(5),
    zip_code TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    is_shelter BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS user_to_location(
    user_id SERIAL PRIMARY KEY REFERENCES login_info(user_id),
    loc_id SERIAL PRIMARY KEY REFERENCES locations(loc_id)
);