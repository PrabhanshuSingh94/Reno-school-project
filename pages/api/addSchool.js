import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, email_id, imageBase64 } = req.body;

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
      });

      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, imageBase64, email_id]
      );

      res.status(200).json({ message: "School added successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
