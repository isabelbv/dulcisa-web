import { connect } from "@tidbcloud/serverless";

export default async function handler(req, res) {
  try {
    const db = connect({ url: process.env.VITE_DATABASE_URL });
    const productos = await db.execute("SELECT * FROM productos");

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
