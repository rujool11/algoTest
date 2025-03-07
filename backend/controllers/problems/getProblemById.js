import asyncHandler from 'express-async-handler';
import Problem from '../../models/problemModel.js';

const getProblemById = asyncHandler(async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        res.status(200);
        res.json(problem);
    } catch (error) {
        res.status(404);
        throw new Error("NOT FOUND ERROR: problem not found");
    }
});

export default getProblemById;