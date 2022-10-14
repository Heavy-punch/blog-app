import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

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
app.listen(process.env.PORT, () => {
  console.log("server started on port: " + process.env.PORT);
});
