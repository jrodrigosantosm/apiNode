const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
});


app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT $1::text as message', ['Hello world!']);
        const message = result.rows[0].message;
        res.send(`Mensagem do banco de dados: ${message}`);
        client.release();
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados', error);
        res.status(500).send('Erro ao conectar ao banco de dados');
    }
});


app.get('/', (req, res) => {
    res.send('Servidor Node.js está funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor está sendo executado em http://localhost:${port}`);
});

app.get('/usuarios', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuarios');
        const usuarios = result.rows;
        res.json(usuarios);
        client.release();
    } catch (error) {
        console.error('Erro ao consultar a tabela usuario', error);
        res.status(500).send('Erro ao consultar a tabela usuario');
    }
});

app.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            const usuario = result.rows[0];
            res.status(200).json(usuario);
        }

        client.release();
    } catch (error) {
        console.error('Erro ao consultar usuário', error);
        res.status(500).send('Erro ao consultar usuário');
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome, email, idade } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO usuarios (nome, email, idade) VALUES ($1, $2, $3) RETURNING *', [nome, email, idade]);
        const novoUsuario = result.rows[0];
        res.status(201).json(novoUsuario);
        client.release();
    } catch (error) {
        console.error('Erro ao criar novo usuário', error);
        res.status(500).send('Erro ao criar novo usuário');
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, email, idade } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE usuarios SET nome = $1, email = $2, idade = $3 WHERE id = $4 RETURNING *', [nome, email, idade, id]);

        if (result.rowCount === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }

        client.release();
    } catch (error) {
        console.error('Erro ao atualizar usuário', error);
        res.status(500).send('Erro ao atualizar usuário');
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            res.status(404).send('Usuário não encontrado');
        } else {
            res.status(200).send('Usuário deletado com sucesso');
        }

        client.release();
    } catch (error) {
        console.error('Erro ao deletar usuário', error);
        res.status(500).send('Erro ao deletar usuário');
    }
});
