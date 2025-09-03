import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    const db = await mysql.createConnection(
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
    );

    const [rows] = await db.execute("SELECT * FROM schools");
    res.status(200).json(rows || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
