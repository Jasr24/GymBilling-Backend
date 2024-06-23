import keys from './keys'
const mysql = require('mysql2/promise');

const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then((conn: { release: () => void; }) => {
        console.log('Conectado a la base de datos');
        conn.release();
    })
    .catch((err: any) => {
        console.error('Error conectando a la base de datos:', err);
    });

export default pool;