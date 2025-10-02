import { Router } from "express";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";

const router = Router();
const cookieName = process.env.COOKIE_NAME;

function setTokenCookie(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // 로컬 http 개발용. 배포시 true(HTTPS)
    maxAge: 7 * 24 * 3600 * 1000,
  });
}

/* 회원가입 */
router.post("/register", async (req, res) => {
  const { email, password, nick } = req.body || {};
  if (!email || !password || !nick)
    return res.status(400).json({ message: "email/password/nick required" });

  const [dup] = await pool.query("SELECT id FROM blog_users WHERE email=?", [
    email,
  ]);
  if (dup.length)
    return res.status(409).json({ message: "Email already exists" });

  const [r] = await pool.query(
    "INSERT INTO blog_users (email, password, nick) VALUES (?, ?, ?)",
    [email, password, nick] // 평문 저장(학습용)
  );

  const payload = { id: r.insertId, email, nick };
  setTokenCookie(res, payload);
  res.status(201).json(payload);
});

/* 로그인 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const [rows] = await pool.query(
    "SELECT id, email, password, nick FROM blog_users WHERE email=?",
    [email]
  );
  const user = rows[0];
  if (!user || user.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });

  const payload = { id: user.id, email: user.email, nick: user.nick };
  setTokenCookie(res, payload);
  res.json(payload);
});

/* 내 정보 */
router.get("/me", async (req, res) => {
  try {
    const token = req.signedCookies?.[cookieName] || req.cookies?.[cookieName];
    if (!token) return res.json(null);
    const p = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ id: p.id, email: p.email, nick: p.nick });
  } catch {
    res.json(null);
  }
});

/* 로그아웃 */
router.post("/logout", (req, res) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.json({ ok: true });
});

export default router;
