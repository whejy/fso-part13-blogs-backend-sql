CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, year, user_id) values ('John', 'www.test.com', 'A Test Blog', 1990, 1);
INSERT INTO blogs (author, url, title, year, user_id) values ('My Smith', 'www.coolblog.com', 'A Very Cool Blog', 1995, 2);

UPDATE sessions SET expired = true WHERE id = 1;