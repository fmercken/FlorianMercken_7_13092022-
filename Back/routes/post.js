const express = require("express");
const auth = require("../middleware/auth.js")
const router = express.Router();
const multer = require('../middleware/multer-config');
const postCtrl = require("../controllers/postController");

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, multer, postCtrl.getPostById)

router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost)
router.delete("/:id", auth, postCtrl.deletePost)
router.post("/:id/like", auth,multer, postCtrl.likePost)

module.exports = router;