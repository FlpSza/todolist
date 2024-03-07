const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

// Crie o pool de conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: 0// limite máximo de conexões simultâneas (0 para ilimitado)
});

// Exporte o pool de conexão para uso em outras partes do aplicativo
module.exports = pool;
