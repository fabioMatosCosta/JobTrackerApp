import User from "../models/User.js";
import Contacts from "../models/Contacts.js";
import JobPost from "../models/JobPost.js";


/* Create */

export const createContact = async (req, res) => {
    try {
        const { userId , postId } = req.params;
        const user = await User.findById(userId);
        const post = await JobPost.findById(postId);

        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            profileLinks,
            notes,
        } = req.body;

        const isUniqueEmail = await Contacts.findOne({email});
        if(isUniqueEmail) return res.status(500).json({message: "Contact already exists"});

        const newContact = new Contacts({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            profileLinks: profileLinks,
            notes: notes,
            company: post.company,
        });
        
        await newContact.save();
        
        user.contacts.push(newContact._id);
        post.contacts.push(newContact._id);
        await user.save();
        await post.save();

        const contactIdList = user.contacts;
        const contactList = await Contacts.find({ _id: { $in: contactIdList } });

        res.status(200).json(contactList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


/* Read */

export const getUserContactList = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const contactList = user.contacts;
        const contacts = await Contacts.find({ _id: { $in: contactList } });
        
        res.status(200).json(contacts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }; 
};

export const getPostContactList = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await JobPost.findById(postId);
        const contactList = post.contacts;

        const contacts = await Contacts.find({ _id: { $in: contactList } });
        
        res.status(200).json(contacts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }; 
};

/* Update */

export const updateContactIsContacted = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await Contacts.findById(contactId);
        contact.isContacted ? contact.isContacted = false : contact.isContacted = true;
                const updatedContact = await Contacts.findByIdAndUpdate(
                    contactId,
                    { isContacted: contact.isContacted },
                    { new: true }
                );
                res.status(200).json(updatedContact);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addContactNotes = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contact = await Contacts.findById(contactId);
        const { notes } = req.body;
        contact.notes.push(notes);
        await contact.save();

        res.status(200).json(contact);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}