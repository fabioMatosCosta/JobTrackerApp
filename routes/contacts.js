import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getUserContactList , 
    createContact,
    getPostContactList,
    updateContactIsContacted,
    addContactNotes
        } from "../controllers/contactsControllers.js";

const router = express.Router();

/* Create */

router.post("/:userId/:postId", verifyToken, createContact);

/* Read */

router.get("/user/:userId", verifyToken, getUserContactList );
router.get("/post/:postId", verifyToken, getPostContactList );

/* Update */

router.patch("/:contactId", verifyToken, updateContactIsContacted );
router.post("/:contactId", verifyToken, addContactNotes ) // Needs route naming change

/* Delete */



export default router;