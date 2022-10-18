import express from "express";
// import {db} from "../db.js";

export const test = (req, res) => {
  return res.status(200).json("hello world!");
};
