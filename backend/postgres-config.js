const Pool = require('pg').Pool;
const pool = new Pool({
    user:'projetwoa',
    host:'postgres.local',
    database:'projetwoa',
    password:'projetwoa',
    port:5000,
});
module.exports = pool;