const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB,
    connectionLimit: 0 // limite máximo de conexões simultâneas (0 para ilimitado)
});

// Exporte o pool de conexão para uso em outras partes do aplicativo
module.exports = pool;