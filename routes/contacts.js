import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getContactList } from "../controllers/contactsControllers.js";

const router = express.Router();

/* Read */

router.get("/:userId", verifyToken, getContactList );

export default router;