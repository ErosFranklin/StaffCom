const dotenv = require("dotenv");
const mysql = require("mysql2/promise"); // ✅ versão com suporte a Promises

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log("✅ Conectado ao banco de dados com sucesso!");
      connection.release(); 
    } catch (error) {
      console.error("❌ Erro ao conectar no banco de dados:", error.message);
      process.exit(1); 
    }
    
  })();
module.exports = pool;
