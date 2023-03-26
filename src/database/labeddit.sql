-- Active: 1673871648594@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Fulano", "fulano@email.com", "fulano123", "NORMAL"),
	("u002", "Beltrana", "beltrana@email.com", "beltrana00", "NORMAL"),
	("u003", "Astrodev", "astrodev@email.com", "astrodev99", "ADMIN");


SELECT * FROM users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO posts(id, creator_id, content)
VALUES
    ("p001", "u001", "Lançamento do meu livro na próxima semana!"),
    ("p002", "u001", "Aprovada no vestibular!"),
    ("p003", "u002", "Curtindo as férias em Malibu.");

SELECT * FROM posts;

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO likes_dislikes(user_id, post_id, like)
VALUES
    ("u002", "p001", 1),
    ("u003", "p001", 1),
    ("u002", "p002", 1),
    ("u003", "p002", 1),
    ("u001", "p003", 1),
    ("u003", "p003", 0);

SELECT * FROM likes_dislikes;

UPDATE posts
SET likes = 2
WHERE id = "p001";

UPDATE posts
SET likes = 2
WHERE id = "p002";

UPDATE posts
SET likes = 1
WHERE id = "p003";

UPDATE posts
SET dislikes = 1
WHERE id = "p003";

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;

CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO comments(id, user_id, post_id, content)
VALUES
    ("c001", "u002", "p001", "Estarei presente no lançamento!"),
    ("c002", "u003", "p001", "Irei te prestigiar."),
    ("c003", "u002", "p002", "Parabéns!");

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    comments.content AS comments,
    comments.user_id AS comment_creator
FROM posts
JOIN comments
ON posts.id = comments.post_id;

SELECT * FROM comments;

CREATE TABLE likes_dislikes_comments (
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


SELECT * FROM likes_dislikes_comments;


