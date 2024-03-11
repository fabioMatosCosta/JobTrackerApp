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

export const updatePostBoleans = async (req, res) => {
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
    }
};