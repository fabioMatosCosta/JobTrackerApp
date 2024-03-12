import User from "../models/User.js";
import Contacts from "../models/Contacts.js";

export const getContactList = async (req, res) => {
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