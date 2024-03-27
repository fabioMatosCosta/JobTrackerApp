import User from "../models/User.js";
import JobPost from "../models/JobPost.js"
import mongoose from "mongoose";

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
    };
};

export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await JobPost.findById(postId);
        const frontEndPost = {
            title: post.title,
            type: post.type,
            dateToApply: post.dateToApply,
            jobLink: post.jobLink,
            company: post.company,
            companyWebsite: post.companyWebsite,
            contacts: post.contacts,
            isResearched: post.isResearched,
            isCoverLetter: post.isCoverLetter,
            isApplied: post.isApplied,
            isReply: post.isReply,
            reply: post.reply,
            };
        res.status(200).json(frontEndPost);
    }catch (err) {
        res.status(404).json({ message: err.message });
    };
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
    };
};

/* Update */
export const updatePostBooleans = async (req, res) => {
    try {
        const { postId , param } = req.params;
        const post = await JobPost.findById(postId);

        switch (param) {
            case "isResearched":
                post.isResearched ? post.isResearched = false : post.isResearched = true;
                const updatedPostResearched = await JobPost.findByIdAndUpdate(
                    postId,
                    { isResearched: post.isResearched },
                    { new: true }
                );
                res.status(200).json(updatedPostResearched);
                break;
            case "isCoverLetter":
                post.isCoverLetter ? post.isCoverLetter = false : post.isCoverLetter = true;
                const updatedPostCover = await JobPost.findByIdAndUpdate(
                    postId,
                    { isCoverLetter: post.isCoverLetter },
                    { new: true }
                );
                res.status(200).json(updatedPostCover);
                break;
            case "isApplied":
                post.isApplied ? post.isApplied = false : post.isApplied = true;
                const updatedPostApplied = await JobPost.findByIdAndUpdate(
                    postId,
                    { isApplied: post.isApplied },
                    { new: true }
                );
                res.status(200).json(updatedPostApplied);
                break;
            case "isReply":
                post.isReply ? post.isReply = false : post.isReply = true;
                const updatedPostReply = await JobPost.findByIdAndUpdate(
                    postId,
                    { isReply: post.isReply },
                    { new: true }
                );
                res.status(200).json(updatedPostReply);
                break;
            default:
                res.status(404).json({ message: "Invalid parameter" });
        };
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
};

export const updatePostReply = async ( req, res ) => {
    try {
        const { postId } = req.params;
        const { newReply } = req.body;

        /* Check if postId is valid, I was having errors with this */

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post_id" });
        }

        const updatedPostReply = await JobPost.findByIdAndUpdate(
            postId,
            { reply: newReply },
            { new: true }
        );
        res.status(200).json(updatedPostReply); 
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
}

/* Delete */

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await JobPost.findById(postId);
        if(post){
            await JobPost.findByIdAndDelete(postId);
            const user = await User.findById(post.userId);
            user.jobPosts.pull(postId);
            await user.save();
            res.status(402).json({ message: "Post deleted successfully" }); {/* Change this to send the new post list */}
        }else{
            res.status(404).json({ message: "Post not found" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
};