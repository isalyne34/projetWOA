const Pool = require('pg').Pool;
const pool = new Pool({
   user: 'projetwoa',
   host: 'postgresql.local',
   database: 'projetwoa',
   password: 'test',
   port: 5432,
}).connect();

module.exports = pool;
