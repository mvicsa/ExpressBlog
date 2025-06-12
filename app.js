import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware.js";
import connectDB from "./config/db.config.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGINS.split(";");

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB Connection Error:", err));
