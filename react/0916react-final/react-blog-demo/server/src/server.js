import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";

dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "(set)" : "(empty)");
console.log("DB_DATABASE:", process.env.DB_DATABASE);

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// 5173 ~ 5179 포트까지 허용
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 쿠키/세션 인증 허용 -> true일 때는 * 전체허용 안됨
  })
);

app.get("/", (_, res) => res.json({ ok: true }));

app.use("/auth", authRouter); // register, login, me, logout
app.use("/users", usersRouter); // 목록(관리/테스트)
app.use("/posts", postsRouter); // CRUD(생성/수정/삭제는 로그인+소유자)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
