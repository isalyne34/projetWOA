const Pool = require('pg').Pool;
const pool = new Pool({
   user: 'postgres',
   host: 'postgresql',
   database: 'postgres',
   password: 'postgres',
   port: 5432,
}).connect();

module.exports = pool;
