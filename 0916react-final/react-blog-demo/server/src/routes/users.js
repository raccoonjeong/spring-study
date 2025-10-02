import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/* GET /users?page=1&size=10 */
router.get("/", async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const size = Math.max(parseInt(req.query.size || "10", 10), 1);
  const offset = (page - 1) * size;

  const [[{ total }]] = await pool.query(
    "SELECT COUNT(*) AS total FROM blog_users"
  );
  const [rows] = await pool.query(
    `SELECT id, email, nick, created_at
       FROM blog_users
      ORDER BY id DESC
      LIMIT ? OFFSET ?`,
    [size, offset]
  );

  res.json({ page, size, total, rows });
});

export default router;
