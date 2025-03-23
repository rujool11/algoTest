import asyncHandler from 'express-async-handler';
import TestCase from '../../models/testCaseModel.js';

const getTestCasesByProblem = asyncHandler(async (req, res) => {
    try {
        const { problemId } = req.params;

        const cursor = TestCase.find({ problemId }).cursor();
        const testCases = [];

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            testCases.push(doc);
        }

        res.status(200).json(testCases);
    } catch (error) {
        res.status(500);
        throw new Error("SERVER ERROR: " + error.message);
    }
});

export default getTestCasesByProblem;