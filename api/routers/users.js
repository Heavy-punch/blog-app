import express from "express";
import { test } from "../controllers/users.js";
const router = express.Router();

router.route("/").get(test);

export default router;
