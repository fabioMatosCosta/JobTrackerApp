import mongoose from "mongoose";

sixMonthFromNow = () => {
    var today = new Date();
    var targetMonth = today.getMonth() + 6;
    today.setMonth(targetMonth);
    if(today.getMonth() !== targetMonth % 12) {
        today.setDate(0); 
    }
    return today;
}

const JobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 200,
    },
    type: {
        type: String,
    },
    dateToApply: {
        type: Date,
        min: Date.now,
        max: sixMonthFromNow(),
    },
    company: {
        type: String,
        required: true,
    },
    companyWebsite: {
        type: String,
    },
    contacts:{
        type: mongoose.Types.ObjectId,
        ref: "Contacts",
    },
    jobLink:{
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    isResearched: {
        type: Boolean,
        default: false,
    },
    isCoverLetter: {
        type: Boolean,
        default: false,
    },
    isApplied: {
        type: Boolean,
        default: false,
    },
    isReply: {
        type: Boolean,
        default: false,
        
    },
    reply: {
        type: String,
    },
},{timestamps: true});

const JobPost = mongoose.model("JobPost", JobPostSchema);

export default JobPost;