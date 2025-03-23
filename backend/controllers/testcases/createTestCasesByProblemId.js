import asyncHandler from 'express-async-handler';
import TestCase from '../../models/testCaseModel.js';

const createTestCasesByProblemId = asyncHandler(async (req, res) => {
    try {
        const { problemId } = req.params;
        
        const { password, testCases } = req.body;

        const createdPromises = testCases.map(testcase =>
            TestCase.create({ ...testcase, problemId })
        );

        // use promises for parallel creation of testcases
        const createdTestcases = await Promise.all(createdPromises);
        
        res.status(201).json({ success: true, createdTestcases });

    } catch (error) {
        res.status(500);
        throw new Error("SERVER ERROR: " + error.message);
    }
});


export default createTestCasesByProblemId;