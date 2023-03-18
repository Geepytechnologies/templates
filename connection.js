const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Richgift196897",
  host: "localhost",
  port: 5432,
  database: "cinematic",
});

module.exports = pool;
