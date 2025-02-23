import asyncHandler from 'express-async-handler';
import Problem from '../../models/problemModel.js';

const getAllProblems = asyncHandler(async (req, res) => {
    try{

        const problems = await(Problem.find({}));  
        res.status(200);
        res.json(problems);

    } catch (error) {
        res.status(500);
        throw new Error("SERVER ERROR: " + error.message);
    }
});

export default getAllProblems;