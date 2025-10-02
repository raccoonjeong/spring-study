import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  try {
    const name = process.env.COOKIE_NAME;
    const token = req.signedCookies?.[name] || req.cookies?.[name];
    if (!token) return res.status(401).json({ message: "Unauthenticated" });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email, nick: payload.nick };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* 글 소유자만 수정/삭제 허용 (옵션) */
export function requireOwner(getOwnerId) {
  return async (req, res, next) => {
    try {
      const ownerId = await getOwnerId(req); // 숫자
      if (!req.user || !ownerId || req.user.id !== ownerId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch {
      res.status(500).json({ message: "Owner check failed" });
    }
  };
}
