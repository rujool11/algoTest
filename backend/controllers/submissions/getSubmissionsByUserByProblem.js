import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Submission from '../../models/submissionModel.js'; 

const getSubmissionsByUserByProblem = asyncHandler(async (req, res) => {
    const { uid, pid } = req.params;

    if (!uid || !pid) {
        res.status(400);
        throw new Error("MISSING PARAMETERS: uid or pid not provided");
    }

    if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(pid)) {
        res.status(400);
        throw new Error("INVALID ID: uid or pid is invalid");
    }

    try {
        const submissions = await Submission.find({ 
            user: uid,
            problem: pid 
        }).sort({ createdAt: -1 });
        
        res.status(200).json(submissions);
        
    } catch (error) {
        res.status(500).json({
            error: "SERVER ERROR: failed to get submissions"
        });
    }
});

export default getSubmissionsByUserByProblem;