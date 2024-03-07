import mongoose from "mongoose";

const PORT = process.env.PORT
const url = `http://localhost:${PORT}` /* change later when deployed to process.env.APIURL */


const UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid password : 
            - at least 8 characters,
            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.`,
        },
    },
    picturePath: {
        type: String,
        require: true,
        default: `${url}/assets/jogging_brain_2.jpg`
    },
    jobPosts: {
        type: mongoose.Types.ObjectId,
        ref: "JobPost",
    },
    profileLinks:{
        type: Array,
        default: []
    },
    contacts:{
        type: mongoose.Types.ObjectId,
        ref: "Contacts",
    }
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;