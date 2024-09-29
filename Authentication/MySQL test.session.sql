CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARBINARY(255) NOT NULL,
    -- Adjusting to store hashed password
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
);

-- Insert sample users (hashed password required for real application)
INSERT INTO users (username, password, latitude, longitude)
VALUES
    ('john_doe', 'hashed_password_placeholder', NULL, NULL),
    ('jane_doe', 'hashed_password_placeholder', NULL, NULL),
    ('bob_jones', 'hashed_password_placeholder', NULL, NULL);

-- View users
SELECT * FROM users;
