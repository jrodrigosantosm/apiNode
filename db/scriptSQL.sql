CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    idade INTEGER
);


INSERT INTO usuarios (nome, email, idade) VALUES
('João', 'joao@example.com', 30),
('Maria', 'maria@example.com', 25),
('Pedro', 'pedro@example.com', 35);