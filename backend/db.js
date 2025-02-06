require(dotenv).config();
const { pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;