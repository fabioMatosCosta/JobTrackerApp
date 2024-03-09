import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
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

        res.status(200).json(frontendUser);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};