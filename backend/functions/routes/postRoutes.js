const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/createPost", postController.createPost);
router.get("/getAllPosts", postController.getAllPosts);

module.exports = router;
