import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPostList , createPost , updatePostResearch } from "../controllers/postControllers.js";

const router = express.Router();

/* Read */

router.get("/:userId", verifyToken, getPostList);

/* Create */

router.post("/:userId", verifyToken, createPost);

/* Update */

router.patch("/:postId/:param", verifyToken, updatePostResearch);

/* Delete */

export default router;