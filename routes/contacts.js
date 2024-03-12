import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getUserContactList , 
    createContact,

        } from "../controllers/contactsControllers.js";

const router = express.Router();

/* Create */

router.post("/:userId/:postId", verifyToken, createContact);

/* Read */

router.get("/:userId", verifyToken, getUserContactList );



export default router;