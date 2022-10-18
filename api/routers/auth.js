import express from "express";
import { login, logout, register } from "../controllers/auth.js";
// import express from "express";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
// router.route("/").get(test);

export default router;
