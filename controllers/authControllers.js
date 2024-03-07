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

        const isUniqueEmail = await User.findOne({email});
        if(isUniqueEmail) return res.status(500).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();
        res.statyus(201).json(savedUser);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


/* Login User */

export const login = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email:email });
        if(!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        delete user.password;
        res.status(200).json({ token, user });
    }catch{
        res.status(500).json({ error: err.message })
    }
}