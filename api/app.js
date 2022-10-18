import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();
import authRouters from "./routers/auth.js";
import postRouters from "./routers/posts.js";
import userRouters from "./routers/users.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.files;
  res.status(200).json(file.filename);
});

// app.use()
app.use("/api/auth", authRouters);
app.use("/api/posts", postRouters);
app.use("/api/users", userRouters);

app.listen(8800, () => {
  console.log("server started on port: " + process.env.PORT);
});
