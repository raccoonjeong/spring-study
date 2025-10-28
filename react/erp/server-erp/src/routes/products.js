const express = require("express");
const pool = require("../db");

const router = express.Router();

const parseJSON = (v) => {
  if (v == null) return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  return v; // mysql2가 JSON을 이미 객체로 줄 수도 있음
};

const normalizeProduct = (row) => ({
  id: row.id,
  title: row.title,
  priceText: row.priceText,
  price: row.price,
  priceArr: parseJSON(row.priceArr),
  badges: parseJSON(row.badges),
  img: row.img,
  imgHover: row.imgHover,
  thumbs: row.thumbs,
  reviewCount: row.reviewCount,
  rating: row.rating,
  sizes: parseJSON(row.sizes),
  disabledSizes: parseJSON(row.disabledSizes),
  category: row.category,
  priceBefore: row.priceBefore,
  saleRate: row.saleRate,
  isNew: !!row.isNew,
  isBest: !!row.isBest,
});

// GET /api/products?page=1&pageSize=12&category=women&sizes=230,240
router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page ?? "1", 10));
    const pageSize = Math.min(
      100,
      Math.max(1, parseInt(req.query.pageSize ?? "12", 10))
    );
    const offset = (page - 1) * pageSize;

    const category = String(req.query.category ?? "").trim();
    // "230,240" → [230, 240]
    const filteredSizes = String(req.query.sizes ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((n) => Number(n))
      .filter((n) => !Number.isNaN(n));

    // WHERE 구성
    const where = [];
    const params = [];

    if (category) {
      if (category === "new") where.push("isNew = 1");
      else if (category === "best") where.push("isBest = 1");
      else {
        where.push("category = ?");
        params.push(category);
      }
    }

    if (filteredSizes.length > 0) {
      // sizes 컬럼이 JSON 배열일 경우 (문자열이어도 CAST로 처리)
      // MySQL 8.0+: JSON_OVERLAPS(컬럼, '[...]') → 교집합 있으면 true
      where.push("JSON_OVERLAPS(CAST(sizes AS JSON), CAST(? AS JSON))");
      params.push(JSON.stringify(filteredSizes));
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM mall_products ${whereSql}`,
      params
    );

    const [rows] = await pool.query(
      `
      SELECT id,
        title,
        price,         
        img,
        rating,
        sizes,
        disabledSizes,
        category,
        priceBefore,
        saleRate,
        isNew,
        isBest
      FROM mall_products
      ${whereSql}
      ORDER BY id ASC
      LIMIT ? OFFSET ?
      `,
      [...params, pageSize, offset]
    );

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    res.json({
      page,
      pageSize,
      total,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      items: rows.map(normalizeProduct),
      category,
      filteredSizes,
    });
  } catch (e) {
    next(e);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM mall_products WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Not Found" });
    res.json(normalizeProduct(rows[0]));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
