import User from "../models/User.js";
import JobPost from "../models/JobPost.js"

/* Read */
export const getPostList = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const postIdList = user.jobPosts;
        const jobPosts = await JobPost.find({ _id: { $in: postIdList } });
        
        res.status(200).json(jobPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* Create */
export const createPost =  async (req, res) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId);

        

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}