import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import path from "path";
import commentRoutes from "./routes/commentRoutes.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middlewares/errorHandler.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configure .env file
dotenv.config();

// database connection
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//middlewares
// app.use(invalidPathHandler);
app.use(errorResponserHandler);


// apis
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//port connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));