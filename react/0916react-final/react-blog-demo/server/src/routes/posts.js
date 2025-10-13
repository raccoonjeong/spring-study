import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth, requireOwner } from "../middleware/auth.js";

const router = Router();

/* 목록: GET /posts?page=1&size=10&category=Tech&kw=foo */
router.get("/", async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const size = Math.max(parseInt(req.query.size || "10", 10), 1);
  const offset = (page - 1) * size;

  const { category, kw } = req.query;
  const cond = [];
  const params = [];

  if (category) {
    cond.push("p.category=?");
    params.push(category);
  }
  if (kw) {
    cond.push("(p.title LIKE ? OR p.content LIKE ?)");
    params.push(`%${kw}%`, `%${kw}%`);
  }

  const where = cond.length ? `WHERE ${cond.join(" AND ")}` : "";

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM blog_posts p ${where}`,
    params
  );

  const [rows] = await pool.query(
    `SELECT p.id, p.user_id, p.category, p.title, p.content, p.created_at, p.updated_at,
            u.nick AS author_nick, u.email AS author_email
       FROM blog_posts p
  LEFT JOIN blog_users u ON u.id = p.user_id
       ${where}
   ORDER BY p.id DESC
      LIMIT ? OFFSET ?`,
    [...params, size, offset]
  );

  res.json({ page, size, total, rows });
});

/* 단건 조회: GET /posts/:id */
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const [rows] = await pool.query(
    `SELECT p.*, u.nick AS author_nick, u.email AS author_email
       FROM blog_posts p
  LEFT JOIN blog_users u ON u.id = p.user_id
      WHERE p.id=?`,
    [id]
  );
  const row = rows[0];
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
});

/* 생성: POST /posts (로그인 필요) */
router.post("/", requireAuth, async (req, res) => {
  const { category, title, content } = req.body || {};
  if (!category || !title || !content)
    return res.status(400).json({ message: "category/title/content required" });

  const userId = req.user.id;
  const [r] = await pool.query(
    "INSERT INTO blog_posts (user_id, category, title, content) VALUES (?, ?, ?, ?)",
    [userId, category, title, content]
  );
  res.status(201).json({ id: r.insertId });
});

/* 소유자 조회 유틸 */
async function getPostOwnerId(req) {
  const id = parseInt(req.params.id, 10);
  const [rows] = await pool.query("SELECT user_id FROM blog_posts WHERE id=?", [
    id,
  ]);
  return rows[0]?.user_id || null;
}

/* 수정: PUT /posts/:id (소유자만) */
router.put(
  "/:id",
  requireAuth,
  requireOwner(getPostOwnerId),
  async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { category, title, content } = req.body || {};
    if (!category || !title || !content)
      return res
        .status(400)
        .json({ message: "category/title/content required" });

    await pool.query(
      "UPDATE blog_posts SET category=?, title=?, content=? WHERE id=?",
      [category, title, content, id]
    );
    res.json({ ok: true });
  }
);

/* 삭제: DELETE /posts/:id (소유자만) */
router.delete(
  "/:id",
  requireAuth,
  requireOwner(getPostOwnerId),
  async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await pool.query("DELETE FROM blog_posts WHERE id=?", [id]);
    res.json({ ok: true });
  }
);

export default router;
