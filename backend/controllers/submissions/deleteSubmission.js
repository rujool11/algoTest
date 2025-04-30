import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Submission from "../../models/submissionModel.js";

const deleteSubmission = expressAsyncHandler(async (req, res) => {
    const { sid } = req.params;

    if (!sid) {
        res.status(400);
        throw new Error("MISSING PARAMETER: Submission id not provided");
    }

    try {
        const submission = await Submission.findById(sid);
        if (submission) {
            await Submission.deleteOne({ _id: sid});
            res.status(200).json({message: 'Submission deleted'});
        } else {
            res.status(401).json({message: "Problem not found"});
        }
    } catch (error) {
        res.status(400).json({message: "SERVER ERROR: " + error.message});
    }
});

export default deleteSubmission;
