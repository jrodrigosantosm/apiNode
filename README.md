# API Node.js com PostgreSQL

Esta é uma API simples desenvolvida em Node.js que se conecta a um banco de dados PostgreSQL para realizar operações CRUD (Create, Read, Update, Delete) em uma tabela de usuários.

## Funcionalidades

- **Listar Usuários:** Endpoint para listar todos os usuários cadastrados.
- **Criar Usuário:** Endpoint para criar um novo usuário.
- **Atualizar Usuário:** Endpoint para atualizar informações de um usuário existente.
- **Deletar Usuário:** Endpoint para deletar um usuário existente.

## Instalação

1. Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.
2. Clone este repositório para o seu computador.
3. Instale as dependências usando o comando `npm install`.

## Configuração do Banco de Dados

Certifique-se de criar uma tabela `usuarios` em seu banco de dados PostgreSQL com os seguintes campos: `id` (chave primária), `nome`, `email` e `idade`.

## Variáveis de Ambiente

Rode o arquivo server.js para rodar o projeto com:
node server.js

Certifique-se de configurar as seguintes variáveis de ambiente em um arquivo `.env` na raiz do projeto:

