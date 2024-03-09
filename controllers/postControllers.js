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
        const newJobPost = new JobPost({
            title: req.body.title,
            type: req.body.type,
            jobLink: req.body.jobLink,
            company: req.body.company,
            companyWebsite: req.body.companyWebsite,
            userId: user._id,
            dateToApply: req.body.dateToApply,
            });
        
        await newJobPost.save();

        const user = await User.findById(userId);
        const postIdList = user.jobPosts;
        const jobPosts = await JobPost.find({ _id: { $in: postIdList } });

        res.status(200).json(jobPosts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}