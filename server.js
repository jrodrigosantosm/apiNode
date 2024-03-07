const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


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
        const result = await client.query('SELECT * FROM usuario');
        const usuarios = result.rows;
        res.json(usuarios); // Retorna os dados da tabela usuario como JSON
        client.release();
    } catch (error) {
        console.error('Erro ao consultar a tabela usuario', error);
        res.status(500).send('Erro ao consultar a tabela usuario');
    }
});