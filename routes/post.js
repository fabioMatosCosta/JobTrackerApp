import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getPostList , 
    createPost , 
    updatePostBooleans, 
    updatePostReply, 
    deletePost } from "../controllers/postControllers.js";

const router = express.Router();

/* Read */

router.get("/:userId", verifyToken, getPostList);

/* Create */

router.post("/:userId", verifyToken, createPost);

/* Update */

router.patch("/:postId/:param", verifyToken, updatePostBooleans);
router.post("/:postId/reply", verifyToken, updatePostReply);

/* Delete */

router.delete("/:postId", verifyToken, deletePost );
export default router;