import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPostList , createPost } from "../controllers/postControllers.js";

const router = express.Router();

/* Read */

router.get("/:userId", verifyToken, getPostList);

/* Create */

router.post("/:userId", verifyToken, createPost);

/* Update */



/* Delete */

export default router;