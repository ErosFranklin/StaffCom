const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Successfully connected to database!");
    const [rows] = await connection.query('SELECT 1');
    console.log("✅ Ping to database successful:", rows);
    connection.release();
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
    process.exit(1);
  }

})();
module.exports = pool;
