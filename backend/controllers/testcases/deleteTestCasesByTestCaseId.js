import asyncHandler from 'express-async-handler';
import TestCase from '../../models/testCaseModel.js';

export const deleteTestCasesByTestCaseId = asyncHandler(async (req, res) => {
    const { testCaseId } = req.params;
    
    const deletedTestCase = await TestCase.findByIdAndDelete(testCaseId);

    if (!deletedTestCase) {
        res.status(404);
        throw new Error("NOT FOUND: Test case not found");
    }

    res.status(200).json({ success: true, deletedTestCase });
});


export default deleteTestCasesByTestCaseId;