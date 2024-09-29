CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password BLOB NOT NULL,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
);
INSERT INTO users (username, password)
VALUES ('john_doe', '1234567'),
    ('jane_doe', 'abcdefg'),
    ('bob_jones', 'asdfgh');
SELECT *
FROM users;