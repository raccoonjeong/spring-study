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
  img: row.img,
  imgOver: row.imgOver,
  rating: row.rating,
  reviewCount: row.reviewCount,
  priceArr: parseJSON(row.priceArr),
  badges: parseJSON(row.badges),
  sizes: parseJSON(row.sizes),
  // disabled/disabledSizes 어느 쪽 컬럼이든 대응
  disabled: parseJSON(row.disabled ?? row.disabledSizes ?? null),
  category: row.category,
  priceBefore: row.priceBefore,
  saleRate: row.saleRate,
  isNew: !!row.isNew,
  // isBest/isBest 어느 쪽 컬럼이든 대응
  isBest: !!(row.isBest ?? row.isBest),
});

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM mall_products ORDER BY id ASC"
    );
    res.json(rows.map(normalizeProduct));
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
