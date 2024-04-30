CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('John', 'www.test.com', 'A Test Blog');
INSERT INTO blogs (url, title) values ('www.noauthor.com', 'A Blog With No Author');