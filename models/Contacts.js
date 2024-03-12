import mongoose from "mongoose";

const ContactsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    phoneNumber: {
        type: Number,
    },
    company: {
        type: String,
        required: true,
    },
    profileLinks:{
        type: Array,
        default: []
    },
    isContacted: {
        type: Boolean,
        default: false,
    },
    timeOfContact: {
        type: Date,
    },
    notes: [{
        type: String,
    }]
},{timestamps: true});

const Contacts = mongoose.model("Contacts", ContactsSchema);

export default Contacts;