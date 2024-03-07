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
        const usuarios = result.rows;
        res.json(usuarios);
        client.release();
    } catch (error) {
        console.error('Erro ao consultar a tabela usuario', error);
        res.status(500).send('Erro ao consultar a tabela usuario');
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
