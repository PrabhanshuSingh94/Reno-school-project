import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, email_id, imageBase64, imageName } = req.body;

    try {
      // Save image to public/schoolImages
      const filePath = path.join(process.cwd(), "public", "schoolImages", imageName);
      fs.writeFileSync(filePath, Buffer.from(imageBase64, "base64"));

      // MySQL connection
      const db = await mysql.createConnection({
        host:  process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS, 
        database: process.env.DB_NAME
      });

      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, `/schoolImages/${imageName}`, email_id]
      );

      res.status(200).json({ message: "School added successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
