import asyncHandler from 'express-async-handler';
import TestCase from '../../models/testCaseModel.js';

const deleteAllTestCasesByProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    const result = await TestCase.deleteMany({ problemId });
    
    res.status(200).json({ success: true, deletedCount: result.deletedCount });
});

export default deleteAllTestCasesByProblem;
