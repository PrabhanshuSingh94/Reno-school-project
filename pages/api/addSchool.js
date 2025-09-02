import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, email_id, imageName } = req.body;

    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS, 
        database: process.env.DB_NAME
      });

      // Use placeholder image instead of saving file
      const placeholderImage = `/schoolImages/${imageName}`; 

      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, placeholderImage, email_id]
      );

      res.status(200).json({ message: "School added successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
