import  express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getUserContactList , 
    createContact,
    getPostContactList,
    updateContactIsContacted,
    addContactNotes,
    deleteContactNotes,
    addContactLinks,
    deleteContactLinks
        } from "../controllers/contactsControllers.js";

const router = express.Router();

/* Create */

router.post("/:userId/:postId", verifyToken, createContact);

/* Read */

router.get("/user/:userId", verifyToken, getUserContactList );
router.get("/post/:postId", verifyToken, getPostContactList );

/* Update */

router.patch("/isContacted/:contactId", verifyToken, updateContactIsContacted );
router.post("/:contactId", verifyToken, addContactNotes ); 
router.patch("/links/:contactId", verifyToken, addContactLinks );

/* Delete */

router.delete("/:contactId/:noteIndex", verifyToken, deleteContactNotes);
router.delete("/links/:contactId/:linkIndex", verifyToken, deleteContactLinks);


export default router;