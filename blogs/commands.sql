CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, year, user_id) values ('John', 'www.test.com', 'A Test Blog', 1990, 1);
INSERT INTO blogs (athuor, url, title, year) values ('My Smith', 'www.coolblog.com', 'A Very Cool Blog', 1995);

UPDATE blogs SET year = 1800 WHERE id = 5;