import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Submission from '../../models/submissionModel.js';

const getSubmissionsByUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        res.status(400);
        throw new Error("MISSING PARAMETER: uid not provided")
    }

    if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(400);
        throw new Error("INVALID ID: uid is invalid");
    }

    try {
        const submissions = await Submission.find({ user: uid }).sort({ createdAt: -1 });
        res.status(200).json(submissions);

    } catch (error) {
        res.status(500).json({
            error: "SERVER ERROR: failed to get submissions"
        });
    }
});

export default getSubmissionsByUser;