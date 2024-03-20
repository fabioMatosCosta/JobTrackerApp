import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */

export const register = async (req,res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        /* Unique Email Validation */

        const isUniqueEmail = await User.findOne({email});
        if(isUniqueEmail) return res.status(500).json({message: "Email already exists"});

        /* Password Validation */

        if(password.length < 8) return res.status(500).json({message: "Password must be at least 8 characters"});
        if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) return res.status(500).json({message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"});

        /* Hash Password */

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        /* Changed the user data sent out (without password) */
        const frontendSavedUser = {
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            picturePath: savedUser.picturePath,
            profileLinks: savedUser.profileLinks,
            jobPosts:  savedUser.jobPosts,
            contacts: savedUser.contacts 
        };

        res.status(201).json(frontendSavedUser);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


/* Login User */

export const login = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email:email }).populate("jobPosts");
        if(!user) return res.status(400).json({message: "User not found"});

        /* Password Validation */

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        
        /* Changed the user data sent out (without password) */
        const frontendUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picturePath: user.picturePath,
            profileLinks: user.profileLinks,
            jobPosts:  user.jobPosts,
            contacts: user.contacts 
        };
        
        res.status(200).json({ token, frontendUser });
    }catch{
        res.status(500).json({ error: err.message });
    }
};