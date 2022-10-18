// import express from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const test = (req, res) => {
//   return res.status(200).json("hello world!");
// };
export const register = (req, res) => {
  // check for exist user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(400).json("user already exist!");

    //hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(username, email, password) VALUES(?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created!");
    });
  });
};
export const login = (req, res) => {
  const { username: req_username, password: req_password } = req.body;
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req_username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("user not found!");
    //check password
    const isPasswordCorrect = bcrypt.compareSync(
      req_password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("wrong username or password");
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("logged out");
};
