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
        
        user.jobPosts.push(newJobPost._id);
        await user.save();

        const postIdList = user.jobPosts;
        const jobPosts = await JobPost.find({ _id: { $in: postIdList } });

        res.status(200).json(jobPosts);
    } catch (err) {
        res.status(409).json({ message:	err.message });
    }
};

/* Update */

export const updatePostResearch = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await JobPost.findById(postId);

        if(post.isResearched) {
            post.isResearched.set(false);
        } else {
            post.isResearched.set(true);
        }

        const updatedPost = await JobPost.findByIdAndUpdate(
            postId,
            { isResearched: post.isResearched},
            { new: true }
        );
        
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};