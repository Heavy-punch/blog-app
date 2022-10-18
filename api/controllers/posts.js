import { db } from "../db.js";

// export const test = (req, res) => {
//   return res.status(200).json("hello world!");
// };

// create post
export const addPost = (req, res) => {
  const sql =
    "INSERT INTO posts(`title`, `desc`, `img`, `date`, `uid`) VALUES (?)";
  const { title, desc, img, date, uid } = req.body;
  const value = [title, desc, img, date, uid];
  db.query(sql, [value], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

//delete post
export const deletePost = (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("post deleted!");
  });
};

// get single post
export const getPost = (req, res) => {
  const sql =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img userImg,  `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  const req_id = req.params.id;
  db.query(sql, [req_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

//get all post
export const getPosts = (req, res) => {
  const sql = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";
  db.query(sql, [req.body.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

// update post
export const updatePost = (req, res) => {
  const sql = "UPDATE posts SET `title`=?, `desc`=?,`img`=? WHERE `id` = ?";
  const values = [req.body.title, req.body.desc, req.body.img];
  db.query(sql, [...values, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("post has been updated!");
  });
};
