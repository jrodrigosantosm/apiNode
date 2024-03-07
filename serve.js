const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3000;

// Configuração da conexão com o banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres', // Usuário do banco de dados
    host: 'localhost', // Host do banco de dados
    database: 'postgres', // Nome do banco de dados
    password: '123456', // Senha do banco de dados
    port: 5432, // Porta padrão do PostgreSQL
});

// Rota para testar a conexão com o banco de dados
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

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Servidor Node.js está funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor está sendo executado em http://localhost:${port}`);
});
