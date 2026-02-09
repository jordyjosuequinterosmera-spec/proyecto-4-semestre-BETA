import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // si tienes contraseña, ponla aquí
    database: 'casa_barlovento_db',
    waitForConnections: true,
    connectionLimit: 10
});
