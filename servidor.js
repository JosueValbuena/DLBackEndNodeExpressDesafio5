const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'joyas',
    password: 'postgres',
    allowExitOnIdle: true
});

module.exports = pool;