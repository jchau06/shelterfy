CREATE TABLE IF NOT EXISTS login_info (
    user_id TEXT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
);

CREATE TABLE IF NOT EXISTS locations(
    loc_id SERIAL PRIMARY KEY,
    address_line_one TEXT NOT NULL,
    locality TEXT NOT NULL,
    state_abbr VARCHAR(5) NOT NULL,
    zip_code TEXT NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    is_shelter BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS user_to_location(
    user_id TEXT PRIMARY KEY REFERENCES login_info(user_id),
    loc_id BIGINT PRIMARY KEY REFERENCES locations(loc_id)
);